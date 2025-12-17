<script setup>
import { ref } from 'vue'
import { invoke } from '@tauri-apps/api/core'

const serverAddress = ref('')
const serverPort = ref(8080)
const greetMsg = ref('')
const loading = ref(false)

async function testConnection() {
  loading.value = true
  try {
    greetMsg.value = await invoke('greet', { name: serverAddress.value || 'code-tools' })
  } catch (error) {
    greetMsg.value = '连接失败: ' + error
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="settings">
    <el-card shadow="never">
      <template #header>
        <span>连接设置</span>
      </template>
      <el-form label-width="120px">
        <el-form-item label="code-tools 地址">
          <el-input v-model="serverAddress" placeholder="请输入 code-tools 服务地址" />
        </el-form-item>
        <el-form-item label="连接端口">
          <el-input-number v-model="serverPort" :min="1" :max="65535" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="testConnection">测试连接</el-button>
        </el-form-item>
      </el-form>
      <el-alert v-if="greetMsg" :title="greetMsg" type="success" show-icon />
    </el-card>
  </div>
</template>

<style scoped>
.settings {
  max-width: 600px;
}
</style>
