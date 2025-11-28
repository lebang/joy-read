#!/usr/bin/env node

import { spawn } from 'child_process';

// 集中管理 docker-compose 文件，方便维护
const COMPOSE_FILES = [
  '-f', 'docker-compose.yml',
  '-f', 'docker-compose.infra.yml'
];

// 解析命令行参数
const [action, ...args] = process.argv.slice(2);

/**
 * 运行并等待一个子进程命令
 * @param {string} command - 要执行的命令 (例如 'docker-compose')
 * @param {string[]} commandArgs - 命令的参数数组
 * @returns {Promise<void>}
 */
function runCommand(command, commandArgs) {
  return new Promise((resolve, reject) => {
    console.log(`\n> ${command} ${commandArgs.join(' ')}`);
    const proc = spawn(command, commandArgs, { stdio: 'inherit', shell: true });

    proc.on('close', (code) => {
      if (code !== 0) {
        const errorMsg = `命令执行失败，退出码: ${code}`;
        console.error(errorMsg);
        reject(new Error(errorMsg));
      } else {
        resolve();
      }
    });

    proc.on('error', (err) => {
      console.error('启动子进程失败:', err);
      reject(err);
    });
  });
}

/**
 * 显示帮助信息
 */
function showHelp() {
    console.log(`
用法: npm run joydocker -- <action> [args...]

一个可编程的 Docker 环境管理工具。

可用操作:
  start   [service]   启动指定服务或所有服务。
  stop    [service]   停止指定服务或所有服务。
  restart [service]   重启指定服务或所有服务。
  logs    [service]   查看指定服务或所有服务的日志。
  down                停止并移除所有容器和网络。
  ps                  列出当前项目正在运行的容器。
  migrate             在 backend 服务中运行数据库迁移。
  seed:user           在 backend 服务中运行用户数据填充。

--- 可编程命令示例 ---
  db:reset            一个自定义的组合命令，用于重置数据库。

示例:
  npm run joydocker -- start backend
  npm run joydocker -- db:reset
`);
}

/**
 * 自定义的可编程命令：重置数据库
 * 演示了如何将多个命令组合成一个工作流
 */
async function runDbReset() {
    try {
        console.log('--- 开始重置数据库 ---');
        await runCommand('docker-compose', [...COMPOSE_FILES, 'stop', 'mysql', 'backend']);
        await runCommand('docker-compose', [...COMPOSE_FILES, 'rm', '-f', 'mysql', 'backend']);
        // 卷的名称是 'docker_mysql-data'，因为 docker-compose 会以项目目录名作为前缀
        await runCommand('docker-compose', [...COMPOSE_FILES, 'volume', 'rm', 'docker_mysql-data']).catch(e => console.warn("未能移除数据卷，可能已被删除。继续..."));
        
        console.log('--- 重新启动数据库和后端服务 ---');
        await runCommand('docker-compose', [...COMPOSE_FILES, 'up', '-d', 'mysql', 'backend']);
        
        console.log('等待 15 秒，确保 MySQL 完全初始化...');
        await new Promise(resolve => setTimeout(resolve, 15000));
        
        console.log('--- 开始执行数据库迁移 ---');
        await runCommand('docker-compose', [...COMPOSE_FILES, 'exec', 'backend', 'npm', 'run', 'sequlize-cli', '--', 'db:migrate']);
        
        console.log('--- 开始执行用户数据填充 ---');
        await runCommand('docker-compose', [...COMPOSE_FILES, 'exec', 'backend', 'npm', 'run', 'sequlize-cli', '--', 'db:seed', '--seed', '20250611141601-user.js']);
        
        console.log('--- 数据库重置完成！ ---');
    } catch (error) {
        console.error('--- 数据库重置失败 ---');
    }
}


// 主逻辑
if (!action || action === '-h' || action === '--help') {
  showHelp();
  process.exit(0);
}
// 使用 map 来处理不同的命令
const commandMap = new Map([
  ['start', () => runCommand('docker-compose', [...COMPOSE_FILES, 'up', '-d', '--build', ...args])],
  ['stop', () => runCommand('docker-compose', [...COMPOSE_FILES, 'stop', ...args])],
  ['restart', () => runCommand('docker-compose', [...COMPOSE_FILES, 'restart', ...args])],
  ['logs', () => runCommand('docker-compose', [...COMPOSE_FILES, 'logs', '-f', ...args])],
  ['down', () => runCommand('docker-compose', [...COMPOSE_FILES, 'down', ...args])],
  ['ps', () => runCommand('docker-compose', [...COMPOSE_FILES, 'ps'])],
  ['migrate', () => runCommand('docker-compose', [...COMPOSE_FILES, 'exec', 'backend', 'npm', 'run', 'sequlize-cli', '--', 'db:migrate'])],
  ['seed:user', () => runCommand('docker-compose', [...COMPOSE_FILES, 'exec', 'backend', 'npm', 'run', 'sequlize-cli', '--', 'db:seed', '--seed', '20250611141601-user.js'])],
  ['db:reset', () => runDbReset()]
]);

(async () => {
  const commandHandler = commandMap.get(action);
  if (commandHandler) {
    await commandHandler();
  } else {
    console.error(`错误: 未知的操作 '${action}'`);
    showHelp();
    process.exit(1);
  }
})().catch(err => {
  console.error("脚本执行时发生意外错误:", err);
  process.exit(1);
});
