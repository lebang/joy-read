# Joy Read Web 技术栈与编码规范

## 一、技术栈分析

### 核心框架与生态

- **Vue.js**: 项目核心框架，根据 `package.json` 中的依赖和配置文件推断为 Vue 3。
- **Vue Router**: 用于实现客户端路由。
- **Pinia**: 项目状态管理库。从 `vite.config.js` 的分包策略来看，Pinia 是当前主要使用的状态管理方案，并使用 `pinia-plugin-persistedstate` 进行状态持久化。

### UI 与样式

- **Element Plus**: 主要的 UI 组件库，在 `vite.config.js` 中被单独分包。
- **Bootstrap CSS**: 使用本地的 Bootstrap CSS 文件用于基础样式和布局（非 npm 依赖）。
- **Less**: 作为 CSS 预处理器。

### 构建与打包

项目配置了两种现代化的构建工具，可以选择其中之一进行开发和打包：

- **Vite**: 配置了 `@vitejs/plugin-vue`、`@vitejs/plugin-vue-jsx`、`@vitejs/plugin-legacy` 等插件，支持 Vue 单文件组件、JSX 和旧版浏览器兼容。
- **Rspack**: 另一个可选的构建工具，配置了 `vue-loader`，并实现了代码分割策略。

### 代码规范与质量

- **Prettier**: 用于代码格式化，保证团队代码风格一致。

### 数据请求与工具库

- **Axios**: 用于发起 HTTP 请求，与后端 API 交互。
- **Day.js**: 轻量级的日期时间处理库。
- **Lodash-ES**: 提供了大量实用的工具函数（ES 模块版本）。

### 其他特性

- **Web Workers**: 项目通过 `comlink` 库集成了 Web Worker，用于在后台线程执行耗时任务，避免阻塞主线程，提升应用性能。
- **JSX**: 项目配置了 JSX 支持，允许在 JavaScript/TypeScript 中使用类似 HTML 的语法来编写组件。

---

## 二、编码规范 (根据现有代码推断)

### Vue 组件

- **组合式 API**: 统一使用 `<script setup>` 语法，全面拥抱组合式 API。
- **响应式数据**:
  - 使用 `ref` 定义基础类型和数组的响应式数据。
  - 使用 `reactive` 定义复杂对象的响应式数据。
- **组件命名**:
  - 目录和文件名使用 `kebab-case` (短横线分隔) 或 `PascalCase`。
  - 通用组件在以组件名命名的目录下创建 `index.vue` (例如 `src/components/breadcrumb/index.vue`)。
- **样式**:
  - 强制使用 `<style scoped>` 以避免全局样式污染。
  - class 命名建议遵循 BEM (Block Element Modifier) 规范，以提高可读性和维护性 (例如 `article-detail__header`)。
- **路由**:
  - 在组件中通过 `useRoute()` 和 `useRouter()` 获取路由实例和信息。
  - 页面跳转优先使用**命名路由** (`router.push({ name: '...' })`)，以降低路径变化带来的维护成本。

### API 请求

- **模块化**: API 请求按资源（或业务模块）进行划分，存放于 `src/apis` 目录下 (例如 `article.js`, `user.js`)。
- **请求封装**: 所有请求都应通过 `@utils/request` 中的 `request` 实例发起，该实例统一处理了基础配置、拦截器、错误和加载状态。
- **函数命名**: API 函数名应清晰地描述其功能，如 `getArticle`、`createArticle`。

### 状态管理 (Pinia)

- **组合式风格**: store 定义采用 `setup` 函数形式。
- **命名**: store 遵循 `use<Name>Store` 的驼峰命名约定 (例如 `useUserStore`)。
- **持久化**: 对需要持久化的 store，在定义时添加 `{ persist: true }` 选项。
- **Actions**: 异步操作（如 API 请求）应在 `actions` 中完成，并返回 Promise 或处理结果。

### 通用规范

- **ES6+**: 默认使用 `const`/`let`、箭头函数、`async/await` 等现代 JavaScript 语法。
- **错误处理**: 在 `async` 函数中，使用 `try...catch` 结构捕获和处理异步操作中可能出现的错误。
- **注释**: 对复杂逻辑、重要函数或配置项添加 JSDoc 风格的块级注释 (`/** ... */`)，以提高代码可读性。