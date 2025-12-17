<script setup>
import { ref, watch } from 'vue'
import { useDockerStore } from '@/stores'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  containerName: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:visible'])

const dockerStore = useDockerStore()

const logsContent = ref('')
const logsLoading = ref(false)

// 监听弹窗打开，获取日志
watch(() => props.visible, async (newVal) => {
  if (newVal && props.containerName) {
    await fetchLogs()
  }
})

// 获取日志
async function fetchLogs() {
  logsLoading.value = true
  logsContent.value = ''
  
  try {
    logsContent.value = await dockerStore.getContainerLogs(props.containerName, 200)
  } catch (e) {
    logsContent.value = `获取日志失败: ${e}`
  } finally {
    logsLoading.value = false
  }
}

// 刷新日志
function handleRefresh() {
  fetchLogs()
}

// 关闭弹窗
function handleClose() {
  emit('update:visible', false)
}
</script>

<template>
  <el-dialog 
    :model-value="visible"
    @update:model-value="emit('update:visible', $event)"
    :title="`容器日志 - ${containerName}`"
    width="70%"
    top="5vh"
  >
    <div class="logs-header">
      <el-button size="small" type="primary" @click="handleRefresh" :loading="logsLoading">
        刷新日志
      </el-button>
    </div>
    <div class="logs-container" v-loading="logsLoading">
      <pre class="logs-content">{{ logsContent || '暂无日志' }}</pre>
    </div>
  </el-dialog>
</template>

<style scoped>
.logs-header {
  margin-bottom: 12px;
}

.logs-container {
  max-height: 60vh;
  overflow: auto;
  background: #1e1e1e;
  border-radius: 4px;
  padding: 16px;
}

.logs-content {
  margin: 0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 12px;
  line-height: 1.5;
  color: #d4d4d4;
  white-space: pre-wrap;
  word-break: break-all;
}
</style>
