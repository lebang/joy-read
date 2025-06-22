// persist.js
import { getBestStorage } from './storage'

const DEFAULT_CONFIG = {
  keyPrefix: 'KEY_PINIA_',
  storage: null,
  paths: [], // 需要持久化的状态字段，空数组表示全部持久化
}

// 创建过滤后的状态
function filterState(state, paths) {
  if (!paths.length) return state

  return paths.reduce((acc, path) => {
    if (Object.prototype.hasOwnProperty.call(state, path)) {
      acc[path] = state[path]
    }
    return acc
  }, Object.create(null))
}

export default function createPersistPlugin(config = {}) {
  const mergedConfig = { ...DEFAULT_CONFIG, ...config }
  const storage = mergedConfig.storage || getBestStorage()

  return ({ store }) => {
    const storageKey = mergedConfig.keyPrefix + store.$id

    // 从存储中恢复数据
    const loadState = () => {
      try {
        const data = storage.getItem(storageKey)
        if (data) {
          const parsedData = JSON.parse(data)
          const stateToPatch = filterState(parsedData, mergedConfig.paths)
          store.$patch(stateToPatch)
        }
      } catch (error) {
        console.error(`Failed to load state for store ${store.$id}:`, error)
      }
    }

    // 保存数据到存储（带防抖）
    let saveTimeout
    const saveState = () => {
      clearTimeout(saveTimeout)
      saveTimeout = setTimeout(() => {
        try {
          const stateToSave = filterState(store.$state, mergedConfig.paths)
          storage.setItem(storageKey, JSON.stringify(stateToSave))
        } catch (error) {
          console.error(`Failed to save state for store ${store.$id}:`, error)
        }
      }, 100)
    }

    // 设置持久化监听
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', saveState)
      window.addEventListener('pagehide', saveState)
    }

    const unsubscribe = store.$subscribe(saveState, { detached: true })
    loadState()

    // 清理函数
    return () => {
      unsubscribe()
      if (typeof window !== 'undefined') {
        window.removeEventListener('beforeunload', saveState)
        window.removeEventListener('pagehide', saveState)
      }
    }
  }
}
