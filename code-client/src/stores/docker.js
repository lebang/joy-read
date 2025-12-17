import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { dockerApi } from '@/api/docker'

export const useDockerStore = defineStore('docker', () => {
  // 容器列表
  const containers = ref([])
  
  // 加载状态
  const loading = ref(false)
  
  // 错误信息
  const error = ref(null)
  
  // 运行中的容器数量
  const runningCount = computed(() => 
    containers.value.filter(c => c.state === 'running').length
  )
  
  // 停止的容器数量
  const stoppedCount = computed(() => 
    containers.value.filter(c => c.state !== 'running').length
  )
  
  // 获取容器列表
  async function fetchContainers() {
    loading.value = true
    error.value = null
    try {
      containers.value = await dockerApi.getContainers()
    } catch (e) {
      error.value = e.toString()
      console.error('获取容器列表失败:', e)
    } finally {
      loading.value = false
    }
  }
  
  // 启动容器
  async function startContainer(name) {
    try {
      await dockerApi.startContainer(name)
      // 刷新列表
      await fetchContainers()
      return { success: true }
    } catch (e) {
      error.value = e.toString()
      return { success: false, error: e.toString() }
    }
  }
  
  // 停止容器
  async function stopContainer(name) {
    try {
      await dockerApi.stopContainer(name)
      // 刷新列表
      await fetchContainers()
      return { success: true }
    } catch (e) {
      error.value = e.toString()
      return { success: false, error: e.toString() }
    }
  }
  
  // 重启容器
  async function restartContainer(name) {
    try {
      await dockerApi.restartContainer(name)
      // 刷新列表
      await fetchContainers()
      return { success: true }
    } catch (e) {
      error.value = e.toString()
      return { success: false, error: e.toString() }
    }
  }
  
  // 获取容器日志
  async function getContainerLogs(name, lines = 100) {
    try {
      return await dockerApi.getContainerLogs(name, lines)
    } catch (e) {
      error.value = e.toString()
      throw e
    }
  }
  
  // 启动所有容器
  async function startAll() {
    for (const container of containers.value) {
      if (container.state !== 'running') {
        await startContainer(container.name)
      }
    }
  }
  
  // 停止所有容器
  async function stopAll() {
    for (const container of containers.value) {
      if (container.state === 'running') {
        await stopContainer(container.name)
      }
    }
  }
  
  return {
    containers,
    loading,
    error,
    runningCount,
    stoppedCount,
    fetchContainers,
    startContainer,
    stopContainer,
    restartContainer,
    getContainerLogs,
    startAll,
    stopAll
  }
})
