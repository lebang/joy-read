# CLI 工具迁移说明

## 变更概述

本次更新将项目的 CLI 工具从原始版本迁移到基于 `zx` 和 `minimist` 的优化版本，并统一使用 `pnpm` 作为包管理器。

## 主要变更

### 1. CLI 工具优化

- ✅ **删除**: `cli-zx.js` (临时文件)
- ✅ **保留**: `cli.js` (已替换为优化版本)
- ✅ **技术栈**: 使用 `zx` + `minimist` 实现
- ✅ **代码优化**: 从 277 行减少到 222 行（减少 20%）

### 2. 包管理器切换

- ✅ **从**: npm
- ✅ **到**: pnpm 9.0+
- ✅ **配置**: 在 `package.json` 中添加 `"packageManager": "pnpm@9.0.0"`

### 3. 命令变更

#### 旧命令格式
```bash
npm run codetool -- <command>
npm run codetool:zx -- <command>
```

#### 新命令格式
```bash
pnpm run codetool <command>
```

### 4. 文档更新

- ✅ `README.md`: 所有命令示例更新为 pnpm
- ✅ `项目代码分析报告.md`: 更新技术栈说明和命令示例
- ✅ CLI 帮助信息: 更新命令示例

## 优化亮点

### 代码结构优化

1. **配置集中管理**
   ```javascript
   const CONFIG = {
     compose: [...],
     db: { user, password, name, container, volume },
     seed: '...',
     initDelay: 15000
   };
   ```

2. **工具函数封装**
   ```javascript
   const dc = (...cmd) => $`docker-compose ${CONFIG.compose} ${cmd}`;
   const dbExec = (cmd) => dc`exec -T mysql sh -c ${cmd}`;
   const backendExec = (cmd) => dc`exec backend ${cmd}`;
   ```

3. **命令定义简化**
   ```javascript
   const dcCmd = (cmd) => () => dc`${cmd} ${args}`;
   const execCmd = (service, cmd) => () => dc`exec ${service} ${cmd}`;
   ```

4. **数据库重置流程优化**
   - 使用步骤数组 + 循环
   - 更清晰的进度展示
   - 易于维护和扩展

## 使用指南

### 首次使用

```bash
# 1. 进入工具目录
cd code-tools

# 2. 安装依赖
pnpm install

# 3. 配置环境变量
cp .env.example .env

# 4. 查看帮助
pnpm run codetool --help

# 5. 启动服务
pnpm run codetool start
```

### 常用命令

```bash
# 服务管理
pnpm run codetool start          # 启动所有服务
pnpm run codetool stop           # 停止服务
pnpm run codetool restart        # 重启服务
pnpm run codetool ps             # 查看状态
pnpm run codetool logs           # 查看日志

# 数据库管理
pnpm run codetool migrate        # 运行迁移
pnpm run codetool seed:user      # 填充数据
pnpm run codetool db:backup      # 备份数据库
pnpm run codetool db:console     # MySQL 控制台

# 开发调试
pnpm run codetool shell:backend  # 进入后端容器
pnpm run codetool shell:frontend # 进入前端容器
```

## 兼容性说明

### 保留的功能
- ✅ 所有原有命令功能完全保留
- ✅ Shell 脚本 `codetool.sh` 仍可使用（备用）
- ✅ Docker Compose 配置保持不变

### 新增功能
- ✅ 更友好的错误提示
- ✅ 彩色输出和进度展示
- ✅ 更清晰的帮助信息
- ✅ 更快的命令执行

## 迁移检查清单

- [x] 删除旧的 CLI 文件
- [x] 重命名优化版本为 cli.js
- [x] 更新 package.json
- [x] 更新 README.md
- [x] 更新项目代码分析报告
- [x] 安装 pnpm 依赖
- [x] 测试所有命令
- [x] 验证服务状态

## 性能对比

| 指标 | 旧版本 | 新版本 | 改进 |
|------|--------|--------|------|
| 代码行数 | 277 行 | 222 行 | -20% |
| 命令长度 | `npm run codetool --` | `pnpm run codetool` | 更简洁 |
| 可维护性 | 中等 | 高 | 配置集中 |
| 可扩展性 | 中等 | 高 | 工具函数 |

## 技术栈

### 依赖包
- `zx`: ^8.2.4 - Shell 脚本自动化
- `minimist`: ^1.2.8 - 命令行参数解析

### 包管理器
- `pnpm`: 9.0.0+ - 快速、节省磁盘空间的包管理器

## 故障排查

### pnpm 未安装
```bash
npm install -g pnpm
```

### 依赖安装失败
```bash
# 清理缓存
pnpm store prune

# 重新安装
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### 命令执行失败
```bash
# 检查 Node.js 版本（需要 18+）
node --version

# 检查 cli.js 权限
chmod +x cli.js

# 查看详细日志
pnpm run codetool --verbose <command>
```

## 后续计划

- [ ] 添加更多数据库管理命令
- [ ] 支持自定义配置文件
- [ ] 添加命令别名功能
- [ ] 集成性能监控命令
- [ ] 添加自动化测试

## 参考资料

- [zx 官方文档](https://github.com/google/zx)
- [minimist 文档](https://github.com/minimistjs/minimist)
- [pnpm 官方文档](https://pnpm.io/)
- [项目 README](./README.md)

---

**迁移日期**: 2025-11-27  
**版本**: 2.0.0  
**维护者**: Joy Read Team
