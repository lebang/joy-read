<script setup>
import { ref, onMounted } from 'vue'
import { useDockerStore } from '@/stores'

// 导入子组件
import ContainerToolbar from './components/ContainerToolbar.vue'
import ContainerTable from './components/ContainerTable.vue'
import ContainerLogsDialog from './components/ContainerLogsDialog.vue'

const dockerStore = useDockerStore()

// 日志弹窗状态
const logsDialogVisible = ref(false)
const logsContainerName = ref('')

// 组件挂载时获取容器列表
onMounted(() => {
  dockerStore.fetchContainers()
})

// 刷新列表
function handleRefresh() {
  dockerStore.fetchContainers()
}

// 显示日志
function handleShowLogs(container) {
  logsContainerName.value = container.name
  logsDialogVisible.value = true
}
</script>

<template>
  <div class="containers">
    <!-- 工具栏 -->
    <ContainerToolbar @refresh="handleRefresh" />
    
    <!-- 错误提示 -->
    <el-alert 
      v-if="dockerStore.error" 
      :title="dockerStore.error" 
      type="error" 
      show-icon 
      closable
      style="margin-bottom: 16px;"
    />
    
    <!-- 容器列表 -->
    <ContainerTable @show-logs="handleShowLogs" />
    
    <!-- 日志弹窗 -->
    <ContainerLogsDialog 
      v-model:visible="logsDialogVisible"
      :container-name="logsContainerName"
    />
  </div>
</template>

<style scoped>
.containers {
  width: 100%;
}
</style>
