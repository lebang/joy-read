# Joy Read Code Tools

🛠️ **AI 开发调试工具集** - 用于快速搭建和管理 Joy Read 项目的开发环境

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

## 📖 命令参考

### 基础命令

```bash
# 服务管理
pnpm run codetool -- start [service]   # 启动服务（默认：所有服务）
pnpm run codetool -- stop [service]    # 停止服务
pnpm run codetool -- restart [service] # 重启服务
pnpm run codetool -- down              # 停止并删除所有容器
pnpm run codetool -- ps                # 查看运行状态
pnpm run codetool -- logs [service]    # 查看实时日志
```

### 数据库命令

```bash
# 数据库管理
pnpm run codetool -- migrate           # 运行数据库迁移
pnpm run codetool -- seed:user         # 填充用户测试数据
pnpm run codetool -- db:reset          # 重置数据库（⚠️ 危险操作，会删除所有数据）
pnpm run codetool -- db:backup         # 备份数据库
pnpm run codetool -- db:restore <file> # 从备份恢复数据库
pnpm run codetool -- db:console        # 进入 MySQL 控制台
```

### 开发调试命令

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
| `backend` | Node.js API 服务 | 3000 (内部) |
| `frontend` | Vue.js 前端应用 | 3001 (内部) |
| `mysql` | MySQL 8.4 数据库 | 3306 |
| `redis` | Redis 7.4 缓存 | 6379 |
| `meilisearch` | MeiliSearch 搜索引擎 | 7700 |
| `nginx` | Nginx 反向代理 | 80 (统一入口) |

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
├── docker-compose.yml              # 🆕 应用服务配置（Backend/Frontend/Nginx）
├── docker-compose.infra.yml        # 🆕 基础设施服务配置（MySQL/Redis/MeiliSearch）
├── docker/                         # Docker 配置目录
│   ├── dockerfiles/                # Dockerfile 文件
│   │   ├── backend.Dockerfile      # Backend 构建配置
│   │   └── frontend.Dockerfile     # Frontend 构建配置
│   └── nginx/                      # Nginx 配置
│       ├── nginx.conf              # Nginx 主配置
│       └── mime.types              # MIME 类型配置
├── src/                            # CLI 工具源码
│   ├── cli.js                      # 主命令行工具
│   ├── config/                     # 配置文件
│   └── utils/                      # 工具函数
├── mysql/                          # MySQL 数据目录（自动生成）
├── redis/                          # Redis 数据目录（自动生成）
├── meili/                          # Meilisearch 数据目录（自动生成）
├── logs/                           # 日志目录（自动生成）
├── .env.example                    # 环境变量模板
├── .env                            # 环境变量配置（需创建）
├── package.json                    # 项目配置
└── README.md                       # 本文档
```

**说明**：
- `docker-compose.yml` 和 `docker-compose.infra.yml` - Docker Compose 配置文件，位于 code-tools 根目录，路径简洁清晰
- `docker/` - Docker 相关配置（Dockerfile、Nginx 配置等）
- `src/` - CLI 工具代码，提供便捷的开发命令
- 数据目录（mysql/redis/meili/logs）会在首次启动时自动创建

## 🔧 配置说明

### 环境变量

1. **复制模板文件**:
   ```bash
   cp .env.example .env
   ```

2. **修改配置**:
   ```bash
   # 编辑 .env 文件
   vim .env
   ```

3. **重要配置项**:
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

## 🐛 故障排查

### 服务无法启动

```bash
# 1. 查看服务日志
pnpm run codetool -- logs [service]

# 2. 检查服务状态
pnpm run codetool -- ps

# 3. 重新构建并启动
pnpm run codetool -- down
pnpm run codetool -- start
```

### 数据库连接失败

```bash
# 检查 MySQL 是否就绪
docker exec joy-read-mysql mysqladmin ping -h localhost -u root -p123456

# 查看 MySQL 日志
pnpm run codetool -- logs mysql

# 等待 MySQL 完全启动（通常需要 15-30 秒）
```

### 端口被占用

```bash
# 检查端口占用情况
lsof -i :80    # Nginx
lsof -i :3306  # MySQL
lsof -i :6379  # Redis
lsof -i :7700  # MeiliSearch

# 停止占用端口的进程或修改 docker-compose.yml 中的端口映射
```

### 前端无法访问 API

```bash
# 1. 检查 Nginx 配置
docker exec joy-read-nginx nginx -t

# 2. 查看 Nginx 日志
pnpm run codetool -- logs nginx

# 3. 检查后端服务状态
pnpm run codetool -- logs backend
```

### 容器健康检查失败

```bash
# 查看容器健康状态
docker ps --format "table {{.Names}}\t{{.Status}}"

# 手动测试健康检查
docker exec joy-read-backend wget --spider http://localhost:3000/api/health
docker exec joy-read-mysql mysqladmin ping -h localhost -u root -p123456
docker exec joy-read-redis redis-cli ping
```

## 📝 开发提示

### 热重载

- ✅ **前端**: 代码修改自动热重载（Vite HMR）
- ✅ **后端**: 代码修改自动重启（Nodemon）
- ✅ **配置**: 修改 Docker Compose 配置需要重启服务

### 数据持久化

- 数据库数据保存在 Docker volumes 中
- 容器删除后数据不会丢失
- 使用 `docker volume rm` 可以删除数据卷

### 日志查看

```bash
# 查看所有服务日志
pnpm run codetool -- logs

# 查看特定服务日志
pnpm run codetool -- logs backend

# 查看最近 100 行日志
docker-compose logs --tail=100 backend

# 实时跟踪日志
pnpm run codetool -- logs -f backend
```

### 性能优化

- 首次启动需要构建镜像，耗时较长
- 后续启动使用缓存，速度较快
- 开发环境挂载了代码目录，支持热重载
- 生产环境建议使用独立的 Docker Compose 配置

## 🔒 安全建议

1. **修改默认密码**: 生产环境必须修改所有默认密码
2. **使用强密钥**: JWT_SECRET 和 MEILI_MASTER_KEY 使用强随机字符串
3. **不要提交 .env**: 确保 .env 文件在 .gitignore 中
4. **定期更新**: 定期更新 Docker 镜像和依赖包
5. **限制端口暴露**: 生产环境只暴露必要的端口

## 📚 相关文档

- [Joy Read 项目文档](../README.md)
- [后端服务文档](../joy-read-service/README.md)
- [前端应用文档](../joy-read-web/README.md)
- [Docker 优化文档](DOCKER_OPTIMIZATION.md)
- [路径配置优化文档](docker/PATH_OPTIMIZATION.md)
- [项目迁移文档](MIGRATION.md)
- [Docker Compose 官方文档](https://docs.docker.com/compose/)

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](../LICENSE) 文件

---

**维护者**: Joy Read Team  
**最后更新**: 2025-11-27  
**版本**: 1.0.0
