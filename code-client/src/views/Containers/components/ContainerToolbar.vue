<script setup>
import { useDockerStore } from '@/stores'

const dockerStore = useDockerStore()

const emit = defineEmits(['refresh'])

function handleRefresh() {
  emit('refresh')
}
</script>

<template>
  <div class="container-toolbar">
    <el-button type="primary" :icon="'Refresh'" @click="handleRefresh" :loading="dockerStore.loading">
      刷新
    </el-button>
    <span class="stats">
      运行中: <el-tag type="success" size="small">{{ dockerStore.runningCount }}</el-tag>
      已停止: <el-tag type="danger" size="small">{{ dockerStore.stoppedCount }}</el-tag>
    </span>
  </div>
</template>

<style scoped>
.container-toolbar {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.stats {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 14px;
}
</style>
