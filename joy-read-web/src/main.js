import { createApp } from 'vue'
import './style.less'
import App from './App.vue'
import ElementPlus from 'element-plus'
import '@assets/bootstrap/bootstrap.css'
import 'element-plus/dist/index.css'
import router from '@routes/index'
import { store } from '@store/index'
import 'dayjs/locale/zh-cn'
import { registerELIcons, initGlobalTips } from '@src/setup/index'
import TooltipDirective from '@directives/tooltip/index.jsx'
import { ClickOutside } from 'element-plus'

const app = createApp(App)

initGlobalTips(app)
registerELIcons(app)
app.directive('tooltip', TooltipDirective)
app.directive('click-outside', ClickOutside)
app.use(ElementPlus).use(store).use(router).mount('#app')

export default app
