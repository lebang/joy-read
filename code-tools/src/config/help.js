// 帮助文案配置文件
export const HELP_CONFIG = {
  header: {
    title: 'Joy Read Docker 环境管理工具',
    version: 'v2.0.0',
    description: ''
  },
  usage: 'pnpm run codetool <command> [options]',
  sections: [
    {
      title: '📦 服务管理:',
      commands: [
        { name: 'start [service]', desc: '启动服务 (默认: 所有服务)' },
        { name: 'stop [service]', desc: '停止服务' },
        { name: 'restart [service]', desc: '重启服务' },
        { name: 'down', desc: '停止并删除所有容器' },
        { name: 'ps', desc: '查看服务状态' },
        { name: 'logs [service]', desc: '查看实时日志' }
      ]
    },
    {
      title: '🗄️  数据库管理:',
      commands: [
        { name: 'migrate', desc: '运行数据库迁移' },
        { name: 'seed:user', desc: '填充用户测试数据' },
        { name: 'db:reset', desc: '重置数据库 (⚠️  危险操作)' },
        { name: 'db:backup', desc: '备份数据库到文件' },
        { name: 'db:restore <file>', desc: '从备份文件恢复数据库' },
        { name: 'db:console', desc: '进入 MySQL 控制台' }
      ]
    },
    {
      title: '🔧 开发调试:',
      commands: [
        { name: 'shell:backend', desc: '进入后端容器 Shell' },
        { name: 'shell:frontend', desc: '进入前端容器 Shell' },
        { name: 'shell:mysql', desc: '进入 MySQL 容器 Shell' }
      ]
    },
    {
      title: '📦 依赖管理:',
      commands: [
        { name: 'install:backend', desc: '安装后端依赖' },
        { name: 'install:frontend', desc: '安装前端依赖' }
      ]
    },
    {
      title: '🌐 Nginx 管理:',
      commands: [
        { name: 'reload:njs', desc: 'njs 脚本热更新 (无需重启)' },
        { name: 'logs:njs [lines] [-f]', desc: '查看 njs 日志 (默认20行)' }
      ]
    }
  ],
  options: [
    { name: '-h, --help', desc: '显示帮助信息' },
    { name: '-v, --verbose', desc: '显示详细输出' }
  ],
  examples: [
    'pnpm run codetool start backend',
    'pnpm run codetool logs frontend',
    'pnpm run codetool db:backup',
    'pnpm run codetool shell:backend',
    'pnpm run codetool reload:njs',
    'pnpm run codetool logs:njs 50',
    'pnpm run codetool logs:njs -f'
  ],
  footer: '📚 文档: 查看 README.md 获取更多信息'
};