<script setup>
import { useDockerStore, useServiceStore } from '@/stores'

const dockerStore = useDockerStore()
const serviceStore = useServiceStore()
</script>

<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="hover">
          <el-statistic title="运行容器" :value="dockerStore.runningCount" />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <el-statistic title="停止容器" :value="dockerStore.stoppedCount" />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <el-statistic title="活跃服务" :value="serviceStore.activeCount" />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <el-statistic title="总服务数" :value="serviceStore.totalCount" />
        </el-card>
      </el-col>
    </el-row>

    <el-card class="mt-20" shadow="never">
      <template #header>
        <span>快速操作</span>
      </template>
      <el-space wrap>
        <el-button type="primary" @click="dockerStore.startAll()">启动所有容器</el-button>
        <el-button type="danger" @click="dockerStore.stopAll()">停止所有容器</el-button>
        <el-button type="warning">重启 Nginx</el-button>
        <el-button type="success">查看日志</el-button>
      </el-space>
    </el-card>
  </div>
</template>

<style scoped>
.mt-20 {
  margin-top: 20px;
}
</style>
