<script setup>
import { useAppStore } from '@/stores'
import { Monitor, Setting, Connection, DocumentCopy, Fold, Expand } from '@element-plus/icons-vue'

const appStore = useAppStore()
</script>

<template>
  <el-aside :width="appStore.isCollapse ? '64px' : '220px'" class="aside">
    <div class="logo">
      <img src="/tauri.svg" alt="Logo" class="logo-img" />
      <span v-show="!appStore.isCollapse" class="logo-text">Code Client</span>
    </div>
    <el-menu
      :default-active="appStore.activeMenu"
      class="side-menu"
      :collapse="appStore.isCollapse"
      :collapse-transition="false"
    >
      <el-menu-item index="dashboard" @click="appStore.setActiveMenu('dashboard')">
        <el-icon><Monitor /></el-icon>
        <template #title>仪表盘</template>
      </el-menu-item>
      <el-menu-item index="containers" @click="appStore.setActiveMenu('containers')">
        <el-icon><DocumentCopy /></el-icon>
        <template #title>Docker 容器</template>
      </el-menu-item>
      <el-menu-item index="services" @click="appStore.setActiveMenu('services')">
        <el-icon><Connection /></el-icon>
        <template #title>服务状态</template>
      </el-menu-item>
      <el-menu-item index="settings" @click="appStore.setActiveMenu('settings')">
        <el-icon><Setting /></el-icon>
        <template #title>设置</template>
      </el-menu-item>
    </el-menu>
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="appStore.toggleCollapse()">
      <el-icon :size="18">
        <Expand v-if="appStore.isCollapse" />
        <Fold v-else />
      </el-icon>
    </div>
  </el-aside>
</template>

<style scoped>
.aside {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #e8e8e8;
  transition: width 0.3s;
  overflow: hidden;
  z-index: 100;
}

.logo {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
}

.logo-img {
  width: 32px;
  height: 32px;
  margin-right: 10px;
}

.logo-text {
  color: #333;
  font-size: 18px;
  font-weight: bold;
  white-space: nowrap;
}

.side-menu {
  border-right: none;
  flex: 1;
  --el-menu-bg-color: #fff;
  --el-menu-text-color: #333;
  --el-menu-active-color: #409eff;
  --el-menu-hover-bg-color: #f5f7fa;
}

.side-menu:not(.el-menu--collapse) {
  width: 220px;
}

.collapse-btn {
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #f0f0f0;
  cursor: pointer;
  color: #666;
  transition: all 0.3s;
}

.collapse-btn:hover {
  background-color: #f5f7fa;
  color: #409eff;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .aside {
    background-color: #1f1f1f;
    border-right-color: #333;
  }

  .logo {
    border-bottom-color: #333;
  }

  .logo-text {
    color: #e5e5e5;
  }

  .side-menu {
    --el-menu-bg-color: #1f1f1f;
    --el-menu-text-color: #a0a0a0;
    --el-menu-active-color: #409eff;
    --el-menu-hover-bg-color: #2a2a2a;
  }

  .collapse-btn {
    border-top-color: #333;
    color: #a0a0a0;
  }

  .collapse-btn:hover {
    background-color: #2a2a2a;
  }
}
</style>
