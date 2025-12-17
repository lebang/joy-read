import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useServiceStore = defineStore('service', () => {
  // 服务列表
  const services = ref([
    { name: 'Nginx 反向代理', status: 'active', uptime: '3 天 12 小时' },
    { name: 'MySQL 数据库', status: 'active', uptime: '3 天 12 小时' },
    { name: 'Redis 缓存', status: 'active', uptime: '3 天 12 小时' },
    { name: '后端服务', status: 'inactive', uptime: '-' },
  ])
  
  // 活跃服务数量
  const activeCount = computed(() => 
    services.value.filter(s => s.status === 'active').length
  )
  
  // 总服务数量
  const totalCount = computed(() => services.value.length)
  
  // 启动服务
  function startService(name) {
    const service = services.value.find(s => s.name === name)
    if (service) {
      service.status = 'active'
      service.uptime = '刚刚启动'
    }
  }
  
  // 停止服务
  function stopService(name) {
    const service = services.value.find(s => s.name === name)
    if (service) {
      service.status = 'inactive'
      service.uptime = '-'
    }
  }
  
  return {
    services,
    activeCount,
    totalCount,
    startService,
    stopService
  }
})
