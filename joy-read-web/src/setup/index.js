import { initGlobalTips } from './global-tips'
import * as ElIconModules from '@element-plus/icons-vue'

const registerELIcons = (app) => {
  for (const iconName in ElIconModules) {
    app.component(iconName, ElIconModules[iconName])
  }
}

export { registerELIcons, initGlobalTips }

