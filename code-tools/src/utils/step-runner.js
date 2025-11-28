import 'zx/globals';

/**
 * 步骤执行器
 * 用于按顺序执行多个步骤任务
 */
export class StepRunner {
  /**
   * @param {import('./logger.js').Logger} logger - Logger 实例
   */
  constructor(logger) {
    this.logger = logger;
  }

  /**
   * 执行步骤列表
   * @param {Array<[string, Function]>} steps - 步骤数组 [描述, 执行函数]
   * @returns {Promise<void>}
   */
  async run(steps) {
    for (let i = 0; i < steps.length; i++) {
      const [desc, fn] = steps[i];
      
      this.logger.step(`[${i + 1}/${steps.length}] ${desc}`);
      
      try {
        await fn();
        this.logger.success(`${desc} - 完成`);
      } catch (error) {
        this.logger.error(`${desc} - 失败: ${error.message}`);
        throw error;
      }
    }
  }

  /**
   * 执行步骤列表（静默模式，不显示成功消息）
   * @param {Array<[string, Function]>} steps - 步骤数组 [描述, 执行函数]
   * @returns {Promise<void>}
   */
  async runSilent(steps) {
    for (let i = 0; i < steps.length; i++) {
      const [desc, fn] = steps[i];
      
      this.logger.step(`[${i + 1}/${steps.length}] ${desc}`);
      
      try {
        await fn();
      } catch (error) {
        this.logger.error(`${desc} - 失败: ${error.message}`);
        throw error;
      }
    }
  }

  /**
   * 执行步骤列表（带进度条）
   * @param {Array<[string, Function]>} steps - 步骤数组 [描述, 执行函数]
   * @returns {Promise<void>}
   */
  async runWithProgress(steps) {
    const total = steps.length;
    
    for (let i = 0; i < total; i++) {
      const [desc, fn] = steps[i];
      const current = i + 1;
      
      this.logger.progress(current, total, desc);
      
      try {
        await fn();
      } catch (error) {
        this.logger.error(`${desc} - 失败: ${error.message}`);
        throw error;
      }
    }
    
    this.logger.success(`所有步骤执行完成 (${total}/${total})`);
  }
}
