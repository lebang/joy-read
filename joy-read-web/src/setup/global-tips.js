import { ElMessage } from 'element-plus'
import { getCurrentInstance } from 'vue'
import { emiter } from '@utils/emiter'

// 全局提示函数集合
const globalTips = {
  // 成功提示
  success(message) {
    ElMessage.success(message)
  },
  // 错误提示
  error(message) {
    ElMessage.error(message)
  },
  // 警告提示
  warning(message) {
    ElMessage.warning(message)
  },
  // 信息提示
  info(message) {
    ElMessage.info(message)
  },
}

// 全局功能初始化函数，用于将功能挂载到 Vue 实例
export function initGlobalTips(app) {
  // 挂载全局提示函数
  Object.keys(globalTips).forEach((key) => {
    app.config.globalProperties[`$${key}`] = globalTips[key]
    emiter.on(`tips:${key}`, (message) => {
      console.log('key:', key, 'message;', message);
      globalTips[key](message)
    })
  })
}

// 组合式函数，用于获取全局提示方法
export function useGlobalTips() {
  const instance = getCurrentInstance()
  const { $success, $error, $warning, $info } = instance.appContext.config.globalProperties
  return { $success, $error, $warning, $info }
}
