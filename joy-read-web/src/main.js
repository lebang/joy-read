import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from '@routes/index'
import 'dayjs/locale/zh-cn'
import { initGlobalTips } from '@src/setup/global-tips'

const app = createApp(App)
initGlobalTips(app)

app.use(ElementPlus).use(router).mount('#app')

export default app
