import 'zx/globals';

/**
 * 日志工具类 - 提供统一的日志输出接口
 */
class Logger {
  /**
   * 打印标题
   * @param {string} title - 标题文本
   * @param {string} emoji - 表情符号
   * @returns {Logger} 返回this以支持链式调用
   */
  title(title, emoji = '📋') {
    console.log(chalk.blue(`${emoji} ${title}`));
    console.log(chalk.white('================================\n'));
    return this;
  }

  /**
   * 打印分隔线
   * @param {string} text - 分隔线文本
   * @returns {Logger} 返回this以支持链式调用
   */
  divider(text = '') {
    if (text) {
      console.log(chalk.white(`----------------------------`));
      console.log(chalk.blue(text));
      console.log(chalk.white(`----------------------------`));
    } else {
      console.log(chalk.white('----------------------------'));
    }
    return this;
  }

  /**
   * 打印成功消息
   * @param {string} message - 消息内容
   * @returns {Logger} 返回this以支持链式调用
   */
  success(message) {
    console.log(chalk.green(`✅ ${message}`));
    return this;
  }

  /**
   * 打印错误消息
   * @param {string} message - 消息内容
   * @returns {Logger} 返回this以支持链式调用
   */
  error(message) {
    console.error(chalk.red(`❌ ${message}`));
    return this;
  }

  /**
   * 打印警告消息
   * @param {string} message - 消息内容
   * @returns {Logger} 返回this以支持链式调用
   */
  warn(message) {
    console.warn(chalk.yellow(`⚠️  ${message}`));
    return this;
  }

  /**
   * 打印信息消息
   * @param {string} message - 消息内容
   * @returns {Logger} 返回this以支持链式调用
   */
  info(message) {
    console.log(chalk.cyan(`💡 ${message}`));
    return this;
  }

  /**
   * 打印步骤消息
   * @param {string} message - 消息内容
   * @returns {Logger} 返回this以支持链式调用
   */
  step(message) {
    console.log(chalk.blue(`▶ ${message}...`));
    return this;
  }

  /**
   * 打印灰色文本（用于次要信息）
   * @param {string} message - 消息内容
   * @returns {Logger} 返回this以支持链式调用
   */
  gray(message) {
    console.log(chalk.white(message));
    return this;
  }

  /**
   * 打印提示信息块
   * @param {string[]} tips - 提示信息数组
   * @returns {Logger} 返回this以支持链式调用
   */
  tips(tips) {
    console.log(chalk.cyan('💡 提示：'));
    tips.forEach(tip => {
      console.log(chalk.white(`   - ${tip}`));
    });
    return this;
  }

  /**
   * 打印命令列表
   * @param {string[]} commands - 命令数组
   * @returns {Logger} 返回this以支持链式调用
   */
  commands(commands) {
    commands.forEach(cmd => {
      console.log(chalk.white(`   ${cmd}`));
    });
    return this;
  }

  /**
   * 打印空行
   * @param {number} count - 空行数量
   * @returns {Logger} 返回this以支持链式调用
   */
  newline(count = 1) {
    console.log('\n'.repeat(count - 1));
    return this;
  }

  /**
   * 打印底部分隔线
   * @returns {Logger} 返回this以支持链式调用
   */
  footer() {
    console.log('');
    console.log(chalk.white('================================'));
    return this;
  }

  /**
   * 打印完成消息
   * @param {string} message - 消息内容
   * @returns {Logger} 返回this以支持链式调用
   */
  done(message = '完成！') {
    this.footer();
    console.log(chalk.green(`✨ ${message}\n`));
    return this;
  }

  /**
   * 打印彩色日志（根据关键词自动着色）
   * @param {string} log - 日志内容
   * @param {Object} colorMap - 颜色映射表
   * @returns {Logger} 返回this以支持链式调用
   */
  colorize(log, colorMap = {}) {
    let colored = log;
    for (const [keyword, color] of Object.entries(colorMap)) {
      if (log.includes(keyword)) {
        colored = chalk[color](log);
        break;
      }
    }
    console.log(colored);
    return this;
  }

  /**
   * 打印进度信息
   * @param {number} current - 当前进度
   * @param {number} total - 总数
   * @param {string} message - 消息内容
   * @returns {Logger} 返回this以支持链式调用
   */
  progress(current, total, message) {
    const percentage = Math.round((current / total) * 100);
    console.log(chalk.blue(`[${current}/${total}] ${percentage}% - ${message}`));
    return this;
  }

  /**
   * 打印表格标题
   * @param {string} title - 标题
   * @returns {Logger} 返回this以支持链式调用
   */
  section(title) {
    console.log('');
    console.log(chalk.blue(`📝 ${title}：`));
    this.divider();
    return this;
  }

  /**
   * 打印选项列表
   * @param {string} title - 标题
   * @param {string[]} options - 选项数组
   * @returns {Logger} 返回this以支持链式调用
   */
  options(title, options) {
    console.log('');
    console.log(chalk.cyan(`${title}：`));
    options.forEach(opt => {
      console.log(chalk.white(`   - ${opt}`));
    });
    console.log('');
    return this;
  }
}

// 导出单例
export const logger = new Logger();

// 导出类（用于需要自定义实例的场景）
export { Logger };
