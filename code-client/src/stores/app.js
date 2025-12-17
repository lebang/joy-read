import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  // 当前激活的菜单
  const activeMenu = ref('dashboard')
  
  // 侧边栏折叠状态
  const isCollapse = ref(false)
  
  // 页面标题映射
  const pageTitles = {
    dashboard: '仪表盘',
    containers: 'Docker 容器管理',
    services: '服务状态',
    settings: '设置'
  }
  
  // 当前页面标题
  const currentTitle = computed(() => pageTitles[activeMenu.value] || '未知页面')
  
  // 设置当前菜单
  function setActiveMenu(menu) {
    activeMenu.value = menu
  }
  
  // 切换折叠状态
  function toggleCollapse() {
    isCollapse.value = !isCollapse.value
  }
  
  return {
    activeMenu,
    isCollapse,
    currentTitle,
    setActiveMenu,
    toggleCollapse
  }
})
