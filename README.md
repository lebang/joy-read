# Joy Read Platform

Joy Read 是一个在线阅读和学习平台，提供用户认证、内容管理、课程学习等功能。项目采用前后端分离架构，包含后端服务（joy-read-service）和前端应用（joy-read-web）两个主要部分。

## 技术栈

### 后端 (joy-read-service)
- Node.js + Express.js 框架
- MySQL 数据库 + Sequelize ORM
- Redis 缓存
- JWT 认证
- Docker 容器化支持

### 前端 (joy-read-web)
- Vue 3 框架
- Element Plus UI 组件库
- Pinia 状态管理（支持持久化）
- Vue Router 路由管理
- Axios HTTP 客户端
- Vite/Rspack 构建工具

## 项目结构

```
joy-read/
├── joy-read-service/          # 后端服务
│   ├── app.js                 # 应用入口
│   ├── bin/                   # 启动脚本
│   ├── config/               # 配置文件
│   ├── models/               # 数据模型
│   ├── routes/               # 路由控制器
│   ├── middlewares/          # 中间件
│   ├── utils/                # 工具函数
│   └── docker-compose.yml    # Docker 编排配置
│
└── joy-read-web/             # 前端应用
    ├── src/
    │   ├── apis/            # API 接口
    │   ├── components/      # 通用组件
    │   ├── routes/          # 路由配置
    │   ├── store/           # Pinia 状态管理
    │   ├── views/           # 页面组件
    │   └── utils/           # 工具函数
    └── vite.config.js       # Vite 构建配置
```

## 主要功能

### 用户功能
- 用户注册和登录
- 验证码支持
- 个人信息管理

### 内容管理
- 文章管理
- 分类管理
- 课程管理
- 章节管理

### 系统功能
- 用户管理
- 系统设置
- 权限控制

## 开发环境设置

### 后端服务

1. 安装依赖
```bash
cd joy-read-service
npm install
```

2. 配置环境变量
```bash
# 复制环境变量模板
cp .env.example .env
# 编辑 .env 文件，配置数据库等信息
```

3. 启动服务
```bash
npm run dev
```

### 前端应用

1. 安装依赖
```bash
cd joy-read-web
npm install
```

2. 启动开发服务器
```bash
# 使用 Vite
npm run dev

# 或使用 Rspack
npm run rs:dev
```

3. 构建生产版本
```bash
# 使用 Vite
npm run build

# 或使用 Rspack
npm run rs:build
```

## Docker 部署

项目支持使用 Docker 进行部署，后端服务提供了 `docker-compose.yml` 配置文件：

```bash
cd joy-read-service
docker-compose up -d
```

## 开发团队

Joy Read 平台由热爱技术的开发者们共同开发和维护。我们欢迎社区贡献，如果你有任何问题或建议，请随时提出 issue 或提交 pull request。

## 许可证

[MIT License](LICENSE)
