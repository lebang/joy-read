<script setup>
import { useDockerStore } from '@/stores'
import { ElMessage, ElMessageBox } from 'element-plus'

const dockerStore = useDockerStore()

const emit = defineEmits(['show-logs'])

// 获取状态类型
function getStatusType(state) {
  return state === 'running' ? 'success' : 'danger'
}

// 处理操作
async function handleAction(container, action) {
  switch (action) {
    case 'start':
      const startResult = await dockerStore.startContainer(container.name)
      if (startResult.success) {
        ElMessage.success(`容器 ${container.name} 启动成功`)
      } else {
        ElMessage.error(`启动失败: ${startResult.error}`)
      }
      break
    case 'stop':
      ElMessageBox.confirm(
        `确定要停止容器 ${container.name} 吗？`,
        '确认操作',
        { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
      ).then(async () => {
        const stopResult = await dockerStore.stopContainer(container.name)
        if (stopResult.success) {
          ElMessage.success(`容器 ${container.name} 已停止`)
        } else {
          ElMessage.error(`停止失败: ${stopResult.error}`)
        }
      }).catch(() => {})
      break
    case 'restart':
      const restartResult = await dockerStore.restartContainer(container.name)
      if (restartResult.success) {
        ElMessage.success(`容器 ${container.name} 重启成功`)
      } else {
        ElMessage.error(`重启失败: ${restartResult.error}`)
      }
      break
    case 'logs':
      emit('show-logs', container)
      break
  }
}
</script>

<template>
  <el-table 
    :data="dockerStore.containers" 
    stripe 
    style="width: 100%"
    v-loading="dockerStore.loading"
  >
    <el-table-column prop="name" label="容器名称" min-width="160" />
    <el-table-column prop="image" label="镜像" min-width="150" />
    <el-table-column prop="state" label="状态" width="100">
      <template #default="scope">
        <el-tag :type="getStatusType(scope.row.state)" size="small">
          {{ scope.row.state }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="status" label="运行时间" min-width="150" />
    <el-table-column prop="ports" label="端口映射" min-width="180">
      <template #default="scope">
        <span class="ports-text">{{ scope.row.ports || '-' }}</span>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="220" fixed="right">
      <template #default="scope">
        <el-button-group>
          <el-button 
            size="small" 
            :type="scope.row.state === 'running' ? 'danger' : 'success'"
            @click="handleAction(scope.row, scope.row.state === 'running' ? 'stop' : 'start')"
          >
            {{ scope.row.state === 'running' ? '停止' : '启动' }}
          </el-button>
          <el-button size="small" type="warning" @click="handleAction(scope.row, 'restart')">重启</el-button>
          <el-button size="small" type="info" @click="handleAction(scope.row, 'logs')">日志</el-button>
        </el-button-group>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>
.ports-text {
  font-size: 12px;
  color: #666;
}
</style>
