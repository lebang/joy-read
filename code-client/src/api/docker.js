import { invoke } from '@tauri-apps/api/core'

/**
 * Docker API 封装
 */
export const dockerApi = {
  /**
   * 获取容器列表
   * @returns {Promise<Array>} 容器列表
   */
  async getContainers() {
    try {
      return await invoke('get_docker_ps')
    } catch (error) {
      console.error('获取容器列表失败:', error)
      throw error
    }
  },

  /**
   * 启动容器
   * @param {string} name 容器名称
   * @returns {Promise<string>} 操作结果
   */
  async startContainer(name) {
    try {
      return await invoke('start_container', { name })
    } catch (error) {
      console.error('启动容器失败:', error)
      throw error
    }
  },

  /**
   * 停止容器
   * @param {string} name 容器名称
   * @returns {Promise<string>} 操作结果
   */
  async stopContainer(name) {
    try {
      return await invoke('stop_container', { name })
    } catch (error) {
      console.error('停止容器失败:', error)
      throw error
    }
  },

  /**
   * 重启容器
   * @param {string} name 容器名称
   * @returns {Promise<string>} 操作结果
   */
  async restartContainer(name) {
    try {
      return await invoke('restart_container', { name })
    } catch (error) {
      console.error('重启容器失败:', error)
      throw error
    }
  },

  /**
   * 获取容器日志
   * @param {string} name 容器名称
   * @param {number} lines 日志行数，默认100
   * @returns {Promise<string>} 日志内容
   */
  async getContainerLogs(name, lines = 100) {
    try {
      return await invoke('get_container_logs', { name, lines })
    } catch (error) {
      console.error('获取容器日志失败:', error)
      throw error
    }
  }
}

export default dockerApi
