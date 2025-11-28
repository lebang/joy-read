import 'zx/globals';

/**
 * 容器状态检查器
 * 用于检查 Docker 容器的运行状态
 */
export class ContainerChecker {
  /**
   * @param {import('./logger.js').Logger} logger - Logger 实例
   */
  constructor(logger) {
    this.logger = logger;
  }

  /**
   * 检查容器是否运行
   * @param {string} containerName - 容器名称
   * @param {string} serviceName - 服务名称（用于显示）
   * @returns {Promise<boolean>}
   */
  async check(containerName, serviceName = 'Container') {
    try {
      const result = await $`docker ps --filter name=${containerName} --format {{.Names}}`;
      
      if (!result.stdout.includes(containerName)) {
        throw new Error(`${serviceName}容器未运行`);
      }
      
      this.logger.success(`${serviceName}容器正在运行`).newline();
      return true;
    } catch (error) {
      this.logger
        .error(`${serviceName}容器未运行，请先启动服务：`)
        .gray('   pnpm run codetool -- start');
      
      process.exit(1);
    }
  }

  /**
   * 检查多个容器是否运行
   * @param {Array<{name: string, service: string}>} containers - 容器列表
   * @returns {Promise<boolean>}
   */
  async checkMultiple(containers) {
    for (const { name, service } of containers) {
      await this.check(name, service);
    }
    return true;
  }

  /**
   * 获取容器状态
   * @param {string} containerName - 容器名称
   * @returns {Promise<{running: boolean, status: string}>}
   */
  async getStatus(containerName) {
    try {
      const result = await $`docker ps -a --filter name=${containerName} --format {{.Status}}`;
      const status = result.stdout.trim();
      const running = status.toLowerCase().includes('up');
      
      return { running, status };
    } catch (error) {
      return { running: false, status: 'not found' };
    }
  }
}
