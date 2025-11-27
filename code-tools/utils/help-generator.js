import 'zx/globals';
import { HELP_CONFIG } from '../config/help.js';

/**
 * 生成帮助信息
 * @returns {string} 格式化的帮助文本
 */
export function generateHelp() {
  const { header, usage, sections, options, examples, footer } = HELP_CONFIG;

  let output = chalk.cyan(`
╭═══════════════════════════════════════════════════════════════╮
║          ${header.title} ${header.version}                    ║
║                                                               ║
╰═══════════════════════════════════════════════════════════════╯

${chalk.yellow('用法:')} ${usage}
`);

  // 生成各个命令部分
  sections.forEach(section => {
    output += `\n${chalk.green(section.title)}`;
    section.commands.forEach(cmd => {
      const paddedName = cmd.name.padEnd(25);
      output += `\n  ${chalk.white(paddedName)} ${cmd.desc}`;
    });
  });

  // 生成选项部分
  output += `\n\n${chalk.green('选项:')}`;
  options.forEach(option => {
    const paddedName = option.name.padEnd(25);
    output += `\n  ${chalk.white(paddedName)} ${option.desc}`;
  });

  // 生成示例部分
  output += `\n\n${chalk.yellow('💡 示例:')}`;
  examples.forEach(example => {
    output += `\n  ${example}`;
  });

  // 生成页脚
  output += `\n\n${chalk.blue(footer)}`;

  return output;
}

/**
 * 显示帮助信息到控制台
 */
export function showHelp() {
  console.log(generateHelp());
}