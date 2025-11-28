#!/usr/bin/env node

import 'zx/globals';
import minimist from 'minimist';
import { logger, containerChecker, stepRunner, showHelp } from './utils/index.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// 获取项目根目录（code-tools的父目录）
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = join(__dirname, '../..');

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
  initDelay: 15000,
  njsPath: join(PROJECT_ROOT, 'code-tools/nginx/njs')
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
  logger.title(`备份数据库到: ${filename}`, '📦');
  
  const { user, password, name, container } = CONFIG.db;
  await dbExec(`mysqldump -u${user} -p${password} ${name} > /tmp/${filename}`);
  await $`docker cp ${container}:/tmp/${filename} ./${filename}`;
  
  logger.success(`数据库备份成功: ${filename}`);
}

/** 数据库恢复 */
async function runDbRestore() {
  if (!args[0]) {
    logger.error('请指定备份文件: npm run codetool -- db:restore <filename>');
    process.exit(1);
  }
  
  const filename = args[0];
  logger.title(`从 ${filename} 恢复数据库...`, '📥');
  
  const { user, password, name, container } = CONFIG.db;
  await $`docker cp ./${filename} ${container}:/tmp/${filename}`;
  await dbExec(`mysql -u${user} -p${password} ${name} < /tmp/${filename}`);
  
  logger.success('数据库恢复成功');
}

/** njs 热更新 */
async function runNjsReload() {
  logger.title('Joy Read - njs 热更新', '🔄');
  
  // 检查nginx容器是否运行
  await containerChecker.check('joy-read-nginx', 'Nginx');
  
  // 显示当前njs脚本信息
  logger.section('当前njs脚本');
  try {
    await $`ls -lh ${CONFIG.njsPath}`;
  } catch (error) {
    logger.warn('无法列出njs脚本目录');
  }
  logger.newline();
  
  // 执行热更新
  logger.step('执行热更新');
  logger.divider();
  
  try {
    await $`docker exec joy-read-nginx nginx -s reload`;
    logger
      .success('热更新成功！')
      .newline()
      .tips([
        '修改 code-tools/nginx/njs/*.js 后运行此命令',
        '或手动执行: docker exec joy-read-nginx nginx -s reload',
        '查看日志: docker logs -f joy-read-nginx'
      ]);
  } catch (error) {
    logger
      .error('热更新失败，请检查nginx配置')
      .newline()
      .info('查看错误日志：')
      .gray('   docker logs joy-read-nginx');
    process.exit(1);
  }
  
  logger.done('热更新完成！');
}

/** njs 日志查看 */
async function runNjsLogs() {
  logger.title('Joy Read - njs 日志查看', '📋');
  
  // 检查nginx容器是否运行
  await containerChecker.check('joy-read-nginx', 'Nginx');
  
  // 解析参数
  const lines = args[0] || '20';
  const follow = args.includes('-f') || args.includes('--follow');
  
  logger.section(`查看最近 ${lines} 条 njs 日志${follow ? ' (实时跟踪)' : ''}`);
  logger.newline();
  
  try {
    if (follow) {
      // 实时跟踪日志
      logger.info('按 Ctrl+C 退出实时跟踪');
      logger.newline();
      await $`docker logs -f joy-read-nginx 2>&1 | grep --line-buffered "\\[NJS\\]"`;
    } else {
      // 显示最近的日志
      const result = await $`docker logs --tail ${lines} joy-read-nginx 2>&1`;
      const njsLogs = result.stdout.split('\n').filter(line => line.includes('[NJS]'));
      
      if (njsLogs.length === 0) {
        logger
          .warn('未找到 [NJS] 日志')
          .newline()
          .gray('提示：发送一些请求后再查看日志')
          .commands([
            'curl http://localhost/',
            'curl http://localhost/api/health'
          ]);
      } else {
        njsLogs.forEach(log => {
          logger.colorize(log, {
            'frontend': 'cyan',
            'backend': 'green'
          });
        });
      }
    }
  } catch (error) {
    if (error.exitCode !== 130) { // 130 是 Ctrl+C 的退出码
      logger.error('查看日志失败');
    }
  }
  
  if (!follow) {
    logger.options('更多选项', [
      '实时跟踪: pnpm run codetool -- logs:njs -f',
      '指定行数: pnpm run codetool -- logs:njs 50',
      '所有日志: pnpm run codetool -- logs nginx'
    ]);
  }
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
        logger.warn('数据卷已删除或不存在，继续...');
      }
    }],
    ['启动服务', () => dc`up -d mysql backend`],
    ['等待初始化', () => sleep(CONFIG.initDelay)],
    ['执行迁移', () => backendExec`npm run sequlize-cli -- db:migrate`],
    ['填充数据', () => backendExec`npm run sequlize-cli -- db:seed --seed ${CONFIG.seed}`]
  ];
  
  logger.title('开始重置数据库...', '🔄');
  
  await stepRunner.run(steps);
  
  logger
    .newline()
    .success('数据库重置完成！');
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
  ps: () => dc`ps --format "table {{.Name}}\t{{.Ports}}\t{{.Image}}\t{{.Service}}\t{{.Status}}"`,
  
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
  'install:backend': execCmd('backend', 'pnpm install'),
  'install:frontend': execCmd('frontend', 'pnpm install'),
  
  // Nginx 管理
  'reload:njs': runNjsReload,
  'logs:njs': runNjsLogs
};

// ==================== 主函数 ====================
async function main() {
  if (!action || argv.help) {
    showHelp();
    return;
  }
  
  const handler = commands[action];
  if (!handler) {
    logger
      .newline()
      .error(`未知命令: '${action}'`);
    showHelp();
    process.exit(1);
  }
  
  try {
    await handler();
  } catch (error) {
    logger
      .newline()
      .error(`命令执行失败: ${error.message}`);
    process.exit(1);
  }
}

// 启动
main().catch((error) => {
  logger.error('💥 脚本异常:');
  console.error(error);
  process.exit(1);
});
