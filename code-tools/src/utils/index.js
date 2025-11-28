/**
 * Utils 统一导出入口
 * 提供日志、容器检查、步骤执行等工具
 */

import { Logger, logger } from './logger.js';
import { ContainerChecker } from './container-checker.js';
import { StepRunner } from './step-runner.js';
import { showHelp } from './help-generator.js';

// 创建单例实例
const containerChecker = new ContainerChecker(logger);
const stepRunner = new StepRunner(logger);

// 导出单例（推荐使用）
export { logger, containerChecker, stepRunner, showHelp };

// 导出类（用于需要自定义实例的场景）
export { Logger, ContainerChecker, StepRunner };

// 默认导出
export default {
  logger,
  containerChecker,
  stepRunner,
  Logger,
  ContainerChecker,
  StepRunner,
  showHelp,
};
