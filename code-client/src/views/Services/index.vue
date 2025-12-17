<script setup>
import { useServiceStore } from '@/stores'

const serviceStore = useServiceStore()

function getStatusType(status) {
  return status === 'active' ? 'success' : 'danger'
}

function handleAction(service) {
  if (service.status === 'active') {
    serviceStore.stopService(service.name)
  } else {
    serviceStore.startService(service.name)
  }
}
</script>

<template>
  <div class="services">
    <el-table :data="serviceStore.services" stripe style="width: 100%">
      <el-table-column prop="name" label="服务名称" width="200" />
      <el-table-column prop="status" label="状态" width="120">
        <template #default="scope">
          <el-tag :type="getStatusType(scope.row.status)">
            {{ scope.row.status === 'active' ? '运行中' : '已停止' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="uptime" label="运行时间" />
      <el-table-column label="操作" width="150">
        <template #default="scope">
          <el-button 
            size="small" 
            :type="scope.row.status === 'active' ? 'danger' : 'success'"
            @click="handleAction(scope.row)"
          >
            {{ scope.row.status === 'active' ? '停止' : '启动' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped>
.services {
  width: 100%;
}
</style>
