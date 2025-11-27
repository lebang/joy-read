#!/usr/bin/env node

import 'zx/globals';
import minimist from 'minimist';

// ==================== 配置常量 ====================
const CONFIG = {
  compose: ['-f', 'docker-compose.yml', '-f', 'docker-compose.infra.yml'],
  db: {
    user: 'root',
    password: '123456',
    name: 'joy_read_basis',
    container: 'joy-read-mysql',
    volume: 'code-tools_mysql-data'
  },
  seed: '20250611141601-user.js',
  initDelay: 15000
};

// 设置 zx 配置
$.verbose = true;
$.quote = (str) => str;

// 解析命令行参数
const argv = minimist(process.argv.slice(2), {
  string: ['_'],
  boolean: ['help', 'h', 'verbose', 'v'],
  alias: { h: 'help', v: 'verbose' }
});

const [action, ...args] = argv._;
if (argv.verbose) $.verbose = true;

/**
 * 显示帮助信息
 */
function showHelp() {
  console.log(chalk.cyan(`
╭═══════════════════════════════════════════════════════════════╮
║          Joy Read Docker 环境管理工具 v2.0.0                    ║
║                                    ║
╰═══════════════════════════════════════════════════════════════╯

${chalk.yellow('用法:')} pnpm run codetool <command> [options]

${chalk.green('📦 服务管理:')}
  ${chalk.white('start [service]')}      启动服务 (默认: 所有服务)
  ${chalk.white('stop [service]')}       停止服务
  ${chalk.white('restart [service]')}    重启服务
  ${chalk.white('down')}                 停止并删除所有容器
  ${chalk.white('ps')}                   查看服务状态
  ${chalk.white('logs [service]')}       查看实时日志
  
${chalk.green('🗄️  数据库管理:')}
  ${chalk.white('migrate')}              运行数据库迁移
  ${chalk.white('seed:user')}            填充用户测试数据
  ${chalk.white('db:reset')}             重置数据库 (⚠️  危险操作)
  ${chalk.white('db:backup')}            备份数据库到文件
  ${chalk.white('db:restore <file>')}    从备份文件恢复数据库
  ${chalk.white('db:console')}           进入 MySQL 控制台
  
${chalk.green('🔧 开发调试:')}
  ${chalk.white('shell:backend')}        进入后端容器 Shell
  ${chalk.white('shell:frontend')}       进入前端容器 Shell
  ${chalk.white('shell:mysql')}          进入 MySQL 容器 Shell
  
${chalk.green('📦 依赖管理:')}
  ${chalk.white('install:backend')}      安装后端依赖
  ${chalk.white('install:frontend')}     安装前端依赖

${chalk.green('选项:')}
  ${chalk.white('-h, --help')}           显示帮助信息
  ${chalk.white('-v, --verbose')}        显示详细输出

${chalk.yellow('💡 示例:')}
  pnpm run codetool start backend
  pnpm run codetool logs frontend
  pnpm run codetool db:backup
  pnpm run codetool shell:backend

${chalk.blue('📚 文档:')} 查看 README.md 获取更多信息
`));
}

// ==================== 工具函数 ====================
/** 执行 docker-compose 命令 */
const dc = (...cmd) => {
  const allArgs = [...CONFIG.compose, ...cmd.flat()];
  return $`docker-compose ${allArgs}`;
};

/** 执行数据库命令 */
const dbExec = (cmd) => dc`exec -T mysql sh -c ${cmd}`;

/** 执行后端命令 */
const backendExec = (cmd) => dc`exec backend ${cmd}`;

/** 生成时间戳文件名 */
const getTimestampFilename = () => {
  const date = new Date().toISOString().split('T')[0];
  return `backup-${date}.sql`;
};

/** 数据库备份 */
async function runDbBackup() {
  const filename = getTimestampFilename();
  console.log(chalk.blue(`📦 备份数据库到: ${filename}`));
  
  const { user, password, name, container } = CONFIG.db;
  await dbExec(`mysqldump -u${user} -p${password} ${name} > /tmp/${filename}`);
  await $`docker cp ${container}:/tmp/${filename} ./${filename}`;
  
  console.log(chalk.green(`✅ 数据库备份成功: ${filename}`));
}

/** 数据库恢复 */
async function runDbRestore() {
  if (!args[0]) {
    console.error(chalk.red('❌ 请指定备份文件: npm run codetool -- db:restore <filename>'));
    process.exit(1);
  }
  
  const filename = args[0];
  console.log(chalk.blue(`📥 从 ${filename} 恢复数据库...`));
  
  const { user, password, name, container } = CONFIG.db;
  await $`docker cp ./${filename} ${container}:/tmp/${filename}`;
  await dbExec(`mysql -u${user} -p${password} ${name} < /tmp/${filename}`);
  
  console.log(chalk.green('✅ 数据库恢复成功'));
}

/** 重置数据库 */
async function runDbReset() {
  const steps = [
    ['停止服务', () => dc`stop mysql backend`],
    ['删除容器', () => dc`rm -f mysql backend`],
    ['删除数据卷', async () => {
      try {
        await $`docker volume rm ${CONFIG.db.volume}`;
      } catch {
        console.warn(chalk.yellow('数据卷已删除或不存在，继续...'));
      }
    }],
    ['启动服务', () => dc`up -d mysql backend`],
    ['等待初始化', () => sleep(CONFIG.initDelay)],
    ['执行迁移', () => backendExec`npm run sequlize-cli -- db:migrate`],
    ['填充数据', () => backendExec`npm run sequlize-cli -- db:seed --seed ${CONFIG.seed}`]
  ];
  
  console.log(chalk.yellow('🔄 开始重置数据库...\n'));
  
  for (const [desc, fn] of steps) {
    console.log(chalk.blue(`▶ ${desc}...`));
    await fn();
  }
  
  console.log(chalk.green('\n✅ 数据库重置完成！'));
}

// ==================== 命令定义 ====================
/** 创建简单的 docker-compose 命令 */
const dcCmd = (cmd) => () => args.length > 0 ? dc`${cmd} ${args}` : dc`${cmd}`;

/** 创建容器 exec 命令 */
const execCmd = (service, cmd) => () => dc`exec ${service} ${cmd}`;

/** 命令映射表 */
const commands = {
  // 服务管理
  start: () => dc`up -d --build ${args}`,
  stop: dcCmd('stop'),
  restart: dcCmd('restart'),
  logs: () => dc`logs -f ${args}`,
  down: dcCmd('down'),
  ps: () => dc`ps`,
  
  // 数据库管理
  migrate: () => backendExec`npm run sequlize-cli -- db:migrate`,
  'seed:user': () => backendExec`npm run sequlize-cli -- db:seed --seed ${CONFIG.seed}`,
  'db:reset': runDbReset,
  'db:backup': runDbBackup,
  'db:restore': runDbRestore,
  'db:console': () => {
    const { user, password, name } = CONFIG.db;
    return dc`exec mysql mysql -u${user} -p${password} ${name}`;
  },
  
  // Shell 访问
  'shell:backend': execCmd('backend', 'sh'),
  'shell:frontend': execCmd('frontend', 'sh'),
  'shell:mysql': execCmd('mysql', 'bash'),
  
  // 依赖管理
  'install:backend': execCmd('backend', 'npm install'),
  'install:frontend': execCmd('frontend', 'npm install')
};

// ==================== 主函数 ====================
async function main() {
  if (!action || argv.help) {
    showHelp();
    return;
  }
  
  const handler = commands[action];
  if (!handler) {
    console.error(chalk.red(`\n❌ 未知命令: '${action}'`));
    showHelp();
    process.exit(1);
  }
  
  try {
    await handler();
  } catch (error) {
    console.error(chalk.red(`\n❌ 命令执行失败: ${error.message}`));
    process.exit(1);
  }
}

// 启动
main().catch((error) => {
  console.error(chalk.red('💥 脚本异常:'), error);
  process.exit(1);
});
