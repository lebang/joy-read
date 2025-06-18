import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import ElementPlus from 'element-plus'
import '@assets/bootstrap/bootstrap.css'
import 'element-plus/dist/index.css'
import router from '@routes/index'
import { store } from '@store/index'
import 'dayjs/locale/zh-cn'
import { initGlobalTips } from '@src/setup/global-tips'
import TooltipDirective from '@directives/tooltip/index.jsx'

const app = createApp(App)
initGlobalTips(app)
app.directive('tooltip', TooltipDirective)
app.use(ElementPlus).use(store).use(router).mount('#app')

export default app
