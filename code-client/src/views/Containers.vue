<script setup>
import { useDockerStore } from '@/stores'

const dockerStore = useDockerStore()

function getStatusType(status) {
  return status === 'running' ? 'success' : 'danger'
}

function handleAction(container, action) {
  switch (action) {
    case 'start':
      dockerStore.startContainer(container.id)
      break
    case 'stop':
      dockerStore.stopContainer(container.id)
      break
    case 'restart':
      dockerStore.restartContainer(container.id)
      break
    case 'logs':
      // TODO: 查看日志
      console.log('查看日志:', container.name)
      break
  }
}
</script>

<template>
  <div class="containers">
    <el-table :data="dockerStore.containers" stripe style="width: 100%">
      <el-table-column prop="name" label="容器名称" width="180" />
      <el-table-column prop="image" label="镜像" width="150" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-tag :type="getStatusType(scope.row.status)">
            {{ scope.row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="ports" label="端口映射" />
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button-group>
            <el-button 
              size="small" 
              :type="scope.row.status === 'running' ? 'danger' : 'success'"
              @click="handleAction(scope.row, scope.row.status === 'running' ? 'stop' : 'start')"
            >
              {{ scope.row.status === 'running' ? '停止' : '启动' }}
            </el-button>
            <el-button size="small" type="warning" @click="handleAction(scope.row, 'restart')">重启</el-button>
            <el-button size="small" type="info" @click="handleAction(scope.row, 'logs')">日志</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.containers {
  width: 100%;
}
</style>
