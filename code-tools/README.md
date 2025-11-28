# Joy Read Code Tools

🛠️ **开发调试工具集** - 用于快速搭建和管理 Joy Read 项目的开发环境

---

## 📋 目录

- [快速开始](#-快速开始)
- [命令参考](#-命令参考)
- [架构说明](#️-架构说明)
  - [请求流程](#请求流程)
  - [目录结构](#目录结构)
- [配置说明](#-配置说明)
- [Nginx + njs 可编程转发](#-nginx--njs-可编程转发)
- [CLI 工具开发](#️-cli-工具开发)
- [故障排查](#-故障排查)
- [开发提示](#-开发提示)
- [安全建议](#-安全建议)
- [相关资源](#-相关资源)

---

## 🚀 快速开始

### 前置要求

- **Docker** 20.10+
- **Docker Compose** 2.0+
- **Node.js** 18+ (用于 CLI 工具)
- **pnpm** 9.0+ (包管理器)

### 一键启动

```bash
# 1. 配置环境变量
cp .env.example .env
# 编辑 .env 文件，修改密码和密钥

# 2. 安装依赖
pnpm install

# 3. 启动所有服务
pnpm run codetool -- start

# 4. 等待服务启动完成（约 30-60 秒）

# 5. 访问应用
# 前端: http://localhost
# API: http://localhost/api
# MeiliSearch: http://localhost:7700
```

---

## 📖 命令参考

### 服务管理

```bash
pnpm run codetool -- start [service]   # 启动服务（默认：所有服务）
pnpm run codetool -- stop [service]    # 停止服务
pnpm run codetool -- restart [service] # 重启服务
pnpm run codetool -- down              # 停止并删除所有容器
pnpm run codetool -- ps                # 查看运行状态
pnpm run codetool -- logs [service]    # 查看实时日志
```

### 数据库管理

```bash
pnpm run codetool -- migrate           # 运行数据库迁移
pnpm run codetool -- seed:user         # 填充用户测试数据
pnpm run codetool -- db:reset          # 重置数据库（⚠️ 危险操作）
pnpm run codetool -- db:backup         # 备份数据库
pnpm run codetool -- db:restore <file> # 从备份恢复数据库
pnpm run codetool -- db:console        # 进入 MySQL 控制台
```

### Nginx 管理

```bash
pnpm run codetool -- reload:njs        # 热更新 njs 脚本（无需重启）
pnpm run codetool -- logs:njs [lines]  # 查看 njs 日志（默认20行）
```

### 开发调试

```bash
# Shell 访问
pnpm run codetool -- shell:backend     # 进入后端容器 Shell
pnpm run codetool -- shell:frontend    # 进入前端容器 Shell

# 依赖管理
pnpm run codetool -- install:backend   # 安装后端依赖
pnpm run codetool -- install:frontend  # 安装前端依赖
```

### 服务列表

| 服务 | 说明 | 端口 |
|------|------|------|
| `nginx` | Nginx 反向代理 + njs | 80 (统一入口) |
| `backend` | Node.js API 服务 | 3000 (内部) |
| `frontend` | Vue.js 前端应用 | 3001 (内部) |
| `mysql` | MySQL 8.4 数据库 | 3306 |
| `redis` | Redis 7.4 缓存 | 6379 |
| `meilisearch` | MeiliSearch 搜索引擎 | 7700 |

---

## 🏗️ 架构说明

```
┌─────────────────────────────────────────────────────────┐
│                    Nginx (Port 80)                      │
│                     统一入口网关                          │
└────────────┬────────────────────────┬───────────────────┘
             │                        │
             ▼                        ▼
    ┌────────────────┐      ┌────────────────┐
    │   Frontend     │      │    Backend     │
    │   (Vue 3)      │      │  (Express.js)  │
    │   Port 3001    │      │   Port 3000    │
    └────────────────┘      └────────┬───────┘
                                     │
                    ┌────────────────┼────────────────┐
                    ▼                ▼                ▼
            ┌───────────┐    ┌──────────┐   ┌──────────────┐
            │   MySQL   │    │  Redis   │   │ MeiliSearch  │
            │  Port 3306│    │ Port 6379│   │  Port 7700   │
            └───────────┘    └──────────┘   └──────────────┘
```

### 请求流程

1. **前端请求**: `http://localhost` → Nginx → Frontend (Vue 3)
2. **API 请求**: `http://localhost/api/*` → Nginx → Backend (Express.js)
3. **后端服务**: Backend → MySQL/Redis/MeiliSearch

### 目录结构

```
code-tools/
├── docker-compose.yml              # 应用服务配置（Backend/Frontend/Nginx）
├── docker-compose.infra.yml        # 基础设施服务配置（MySQL/Redis/MeiliSearch）
├── nginx/                          # Nginx 配置目录
│   ├── nginx.conf                  # Nginx 主配置文件
│   ├── mime.types                  # MIME 类型配置
│   └── njs/                        # njs 脚本目录
│       └── proxy.js                # 可编程转发逻辑
├── src/                            # CLI 工具源码
│   ├── cli.js                      # 主命令行工具
│   ├── config/                     # 配置文件目录
│   └── utils/                      # 工具函数目录
│       ├── index.js                # 统一导出入口
│       ├── logger.js               # 日志工具
│       ├── container-checker.js    # 容器检查器
│       ├── step-runner.js          # 步骤执行器
│       └── help-generator.js       # 帮助信息生成器
├── logs/                           # 日志目录（自动生成）
│   └── nginx/                      # Nginx 日志
├── codetool.sh                     # CLI 工具启动脚本
├── reload-njs.sh                   # njs 热更新脚本
├── test-njs-logs.sh                # njs 日志测试脚本
├── .env.example                    # 环境变量模板
├── .env                            # 环境变量配置（需创建）
├── package.json                    # 项目配置
└── README.md                       # 本文档
```

**说明**：
- `docker-compose.yml` / `docker-compose.infra.yml` - Docker Compose 配置文件
- `nginx/` - Nginx 配置和 njs 脚本，支持可编程转发
- `src/` - CLI 工具代码，提供便捷的开发命令
- `logs/` - 日志目录，会在首次启动时自动创建
- 数据目录（mysql/redis/meili）由 Docker volumes 管理，不在项目目录中

## 🔧 配置说明

### 环境变量

```bash
# 1. 复制模板文件
cp .env.example .env

# 2. 编辑配置
vim .env
```

**重要配置项**：
- `MYSQL_ROOT_PASSWORD`: MySQL root 密码（生产环境必须修改）
- `JWT_SECRET`: JWT 令牌密钥（至少 32 字符）
- `MEILI_MASTER_KEY`: MeiliSearch 主密钥（至少 16 字符）

### 端口映射

| 服务 | 容器端口 | 主机端口 | 说明 |
|------|---------|---------|------|
| Nginx | 80 | 80 | 统一入口 |
| Backend | 3000 | - | 内部访问 |
| Frontend | 3001 | - | 内部访问 |
| MySQL | 3306 | 3306 | 数据库连接 |
| Redis | 6379 | 6379 | 缓存连接 |
| MeiliSearch | 7700 | 7700 | 搜索服务 |

### 数据持久化

所有数据存储在 Docker volumes 中：
- `mysql-data`: MySQL 数据库文件
- `redis-data`: Redis 持久化数据
- `meili-data`: MeiliSearch 索引数据

---

## 🌐 Nginx + njs 可编程转发

### 什么是 njs？

njs 是 Nginx 的 JavaScript 引擎，允许使用 JavaScript 编写动态转发逻辑，实现可编程的反向代理。

### 转发逻辑

当前转发规则（`nginx/njs/proxy.js`）：

```javascript
function routeRequest(r) {
    var uri = r.uri;
    
    if (uri.startsWith('/api/')) {
        // API请求 → 后端
        r.log('[NJS] Routing API request to backend: ' + uri);
        return 'http://backend:3000';
    } else {
        // 其他请求 → 前端
        r.log('[NJS] Routing frontend request to frontend: ' + uri);
        return 'http://frontend:3001';
    }
}
```

### 修改转发逻辑

1. **编辑转发脚本**：
   ```bash
   vim code-tools/nginx/njs/proxy.js
   ```

2. **热更新生效**（无需重启容器）：
   ```bash
   pnpm run codetool -- reload:njs
   ```

3. **查看日志**：
   ```bash
   pnpm run codetool -- logs:njs 20
   ```

### 扩展示例

你可以根据需要扩展转发逻辑：

```javascript
// 示例1：根据请求头路由
if (r.headersIn['X-API-Version'] === 'v2') {
    return 'http://backend-v2:3000';
}

// 示例2：A/B测试
var userId = r.headersIn['X-User-ID'];
if (parseInt(userId) % 2 === 0) {
    return 'http://backend-a:3000';
} else {
    return 'http://backend-b:3000';
}

// 示例3：根据域名路由
if (r.headersIn['Host'].includes('admin')) {
    return 'http://admin-backend:3000';
}
```

---

## 🛠️ CLI 工具开发

### 工具架构

CLI 工具使用模块化设计，提供统一的日志输出和工具函数：

```
src/
├── cli.js                 # 主命令行工具
├── config/                # 配置文件
└── utils/                 # 工具函数
    ├── index.js           # 统一导出入口
    ├── logger.js          # 日志工具
    ├── container-checker.js  # 容器检查器
    ├── step-runner.js     # 步骤执行器
    └── help-generator.js  # 帮助信息生成器
```

### Logger 工具

提供统一的日志输出接口，支持链式调用：

```javascript
import { logger, containerChecker, stepRunner } from './utils/index.js';

// 基础用法
logger.title('任务标题', '🚀');
logger.success('操作成功');
logger.error('操作失败');
logger.warn('警告信息');
logger.info('提示信息');

// 链式调用
logger
  .success('操作成功')
  .newline()
  .tips(['提示1', '提示2'])
  .done('完成！');

// 容器检查
await containerChecker.check('joy-read-nginx', 'Nginx');

// 步骤执行
await stepRunner.run([
  ['步骤1', async () => { /* ... */ }],
  ['步骤2', async () => { /* ... */ }]
]);
```

### 添加新命令

在 `cli.js` 中添加新命令：

```javascript
const commands = {
  'my-command': runMyCommand,
  // ... 其他命令
};

async function runMyCommand() {
  logger.title('我的命令', '🎯');
  
  // 检查容器
  await containerChecker.check('my-container', 'MyService');
  
  // 执行任务
  logger.step('执行任务');
  await doSomething();
  
  logger.done('完成！');
}
```

---

## 🐛 故障排查

### 常见问题

| 问题 | 解决方案 |
|------|---------|
| 服务无法启动 | `pnpm run codetool -- logs [service]` 查看日志 |
| 数据库连接失败 | 等待 MySQL 完全启动（15-30秒） |
| 端口被占用 | `lsof -i :80` 检查端口，修改端口映射 |
| 前端无法访问API | 检查 Nginx 日志：`pnpm run codetool -- logs nginx` |
| njs 热更新失败 | 检查 JavaScript 语法，查看 nginx 日志 |

### 快速诊断

```bash
# 查看所有服务状态
pnpm run codetool -- ps

# 查看特定服务日志
pnpm run codetool -- logs [service]

# 重启服务
pnpm run codetool -- restart [service]

# 完全重置（⚠️ 会删除数据）
pnpm run codetool -- down
pnpm run codetool -- start
```

---

## 📝 开发提示

### 热重载支持

- ✅ **前端**：代码修改自动热重载（Vite HMR）
- ✅ **后端**：代码修改自动重启（Nodemon）
- ✅ **njs**：修改后执行 `reload:njs` 即可生效

### 日志查看

```bash
# 查看所有服务日志
pnpm run codetool -- logs

# 查看 njs 日志
pnpm run codetool -- logs:njs 20

# 实时跟踪日志
pnpm run codetool -- logs -f backend
```

---

## 🔒 安全建议

⚠️ **生产环境必读**：

1. **修改默认密码**：所有默认密码必须修改
2. **使用强密钥**：JWT_SECRET 和 MEILI_MASTER_KEY 使用强随机字符串（32+字符）
3. **不要提交 .env**：确保 .env 文件在 .gitignore 中
4. **定期更新**：定期更新 Docker 镜像和依赖包
5. **限制端口暴露**：生产环境只暴露必要的端口

---

## 📚 相关资源

### 项目文档
- [Joy Read 项目文档](../README.md)
- [后端服务文档](../joy-read-service/README.md)
- [前端应用文档](../joy-read-web/README.md)

### 技术文档
- [Docker Compose 官方文档](https://docs.docker.com/compose/)
- [njs 官方文档](https://nginx.org/en/docs/njs/)
- [Nginx 官方文档](https://nginx.org/en/docs/)

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](../LICENSE) 文件

---

**维护者**: Joy Read Team  
**最后更新**: 2025-11-28  
**版本**: 2.0.0
