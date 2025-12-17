<script setup>
import { useAppStore } from '@/stores'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import Dashboard from '@/views/Dashboard.vue'
import Containers from '@/views/Containers.vue'
import Services from '@/views/Services.vue'
import Settings from '@/views/Settings.vue'

const appStore = useAppStore()
</script>

<template>
  <div class="app-layout">
    <!-- 侧边栏 -->
    <AppSidebar />

    <!-- 右侧区域 -->
    <div class="main-wrapper" :style="{ marginLeft: appStore.isCollapse ? '64px' : '220px' }">
      <!-- 顶部栏 -->
      <AppHeader />
      
      <!-- 主内容区 -->
      <main class="main-content">
        <Dashboard v-if="appStore.activeMenu === 'dashboard'" />
        <Containers v-if="appStore.activeMenu === 'containers'" />
        <Services v-if="appStore.activeMenu === 'services'" />
        <Settings v-if="appStore.activeMenu === 'settings'" />
      </main>
    </div>
  </div>
</template>

<style>
/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  height: 100%;
  width: 100%;
}

.app-layout {
  height: 100vh;
  width: 100%;
  background-color: #f5f7fa;
}

.main-wrapper {
  transition: margin-left 0.3s;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f5f7fa;
}

/* Element Plus 深色主题适配 */
@media (prefers-color-scheme: dark) {
  .app-layout {
    background-color: #141414;
  }

  .main-content {
    background-color: #141414;
  }

  .el-card {
    background-color: #1f1f1f;
    border-color: #333;
  }

  .el-table {
    background-color: #1f1f1f;
  }
}
</style>
