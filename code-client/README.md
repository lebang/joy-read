# Joy Read Code Client

🖥️ **开发环境管理客户端** - 用于监控和管理 code-tools 开发环境的桌面/移动端应用

---

## 📋 简介

Code Client 是 [code-tools](../code-tools/README.md) 的配套客户端应用，基于 Tauri 2.0 + Vue 3 构建，提供直观的图形界面来管理开发环境。

### 核心功能（计划中）

- 📊 **Docker 容器状态监控** - 实时查看各容器运行状态、资源占用
- 🔄 **服务管理** - 一键启动、停止、重启各项服务
- 📝 **日志查看** - 实时查看各服务日志输出
- 🗄️ **数据库管理** - 执行迁移、填充测试数据、备份恢复等操作
- ⚙️ **配置管理** - 可视化编辑环境变量和服务配置
- 🔔 **状态通知** - 服务异常时发送系统通知

## 🛠️ 技术栈

- **Tauri 2.0** - 跨平台应用框架（Rust 后端）
- **Vue 3** - 前端框架（`<script setup>` SFC）
- **Vite** - 构建工具
- **TypeScript** - 类型安全

## 📱 支持平台

- ✅ Windows
- ✅ macOS  
- ✅ Linux
- ✅ Android
- ✅ iOS

## 🚀 快速开始

### 前置要求

- **Node.js** 18+
- **pnpm** 9.0+
- **Rust** (用于 Tauri 编译)

### 安装依赖

```bash
cd code-client
pnpm install
```

### 初始化移动端（可选）

```bash
# Android
pnpm tauri android init

# iOS
pnpm tauri ios init
```

### 开发运行

```bash
# 桌面端开发
pnpm tauri dev

# Android 开发
pnpm tauri android dev

# iOS 开发
pnpm tauri ios dev
```

### 构建发布

```bash
# 桌面端
pnpm tauri build

# Android
pnpm tauri android build

# iOS
pnpm tauri ios build
```

## 💡 推荐 IDE 配置

- [VS Code](https://code.visualstudio.com/)
- [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue 语言支持
- [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) - Tauri 开发工具
- [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer) - Rust 语言支持

## 📚 相关资源

- [code-tools 文档](../code-tools/README.md) - 开发环境工具文档
- [Tauri 官方文档](https://tauri.app/)
- [Vue 3 文档](https://vuejs.org/)

---

**维护者**: Joy Read Team  
**最后更新**: 2025-12-17
