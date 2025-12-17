import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useDockerStore = defineStore('docker', () => {
  // 容器列表
  const containers = ref([
    { id: 'nginx-1', name: 'joy-read-nginx', status: 'running', image: 'nginx:latest', ports: '80:80, 443:443' },
    { id: 'mysql-1', name: 'joy-read-mysql', status: 'running', image: 'mysql:8.0', ports: '3306:3306' },
    { id: 'redis-1', name: 'joy-read-redis', status: 'running', image: 'redis:7', ports: '6379:6379' },
    { id: 'node-1', name: 'joy-read-service', status: 'stopped', image: 'node:22', ports: '3000:3000' },
  ])
  
  // 运行中的容器数量
  const runningCount = computed(() => 
    containers.value.filter(c => c.status === 'running').length
  )
  
  // 停止的容器数量
  const stoppedCount = computed(() => 
    containers.value.filter(c => c.status === 'stopped').length
  )
  
  // 启动容器
  function startContainer(id) {
    const container = containers.value.find(c => c.id === id)
    if (container) {
      container.status = 'running'
    }
  }
  
  // 停止容器
  function stopContainer(id) {
    const container = containers.value.find(c => c.id === id)
    if (container) {
      container.status = 'stopped'
    }
  }
  
  // 重启容器
  function restartContainer(id) {
    const container = containers.value.find(c => c.id === id)
    if (container) {
      container.status = 'running'
    }
  }
  
  // 启动所有容器
  function startAll() {
    containers.value.forEach(c => c.status = 'running')
  }
  
  // 停止所有容器
  function stopAll() {
    containers.value.forEach(c => c.status = 'stopped')
  }
  
  return {
    containers,
    runningCount,
    stoppedCount,
    startContainer,
    stopContainer,
    restartContainer,
    startAll,
    stopAll
  }
})
