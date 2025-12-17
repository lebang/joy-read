import { createApp } from "vue";
import { createPinia } from "pinia";
import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "element-plus/dist/index.css";

import App from "./App.vue";

// 创建应用实例
const app = createApp(App);

// 注册 Pinia 状态管理
app.use(createPinia());

// 注册 Element Plus (中文语言包)
app.use(ElementPlus, {
  locale: zhCn,
});

// 注册所有 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 挂载应用
app.mount("#app");
