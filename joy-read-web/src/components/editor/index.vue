<script setup>
import { ref, watch } from 'vue'
import FluentEditor from '@opentiny/vue-fluent-editor'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请输入内容...'
  },
  height: {
    type: [String, Number],
    default: '300px'
  }
})
console.log('props.modelValue:', props.modelValue)
const emit = defineEmits(['update:modelValue', 'change'])

// 内部内容状态
const editorContent = ref(props.modelValue || '')

// 监听外部传入的modelValue变化
watch(() => props.modelValue, (newValue) => {
  console.log('Editor - modelValue changed:', newValue)
  if (newValue !== editorContent.value) {
    editorContent.value = newValue || ''
  }
}, { immediate: true })

// 处理编辑器内容变化
const handleChange = (value) => {
  console.log('Editor - content changed:', value)
  editorContent.value = value
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<template>
  <div class="joy-editor-container" :style="{ height: typeof height === 'number' ? `${height}px` : height }">
    <FluentEditor
      v-model="editorContent"
      :placeholder="placeholder"
      @change="handleChange"
      :data-type="false" 
      :data-upgrade="false"
    />
  </div>
</template>

<style>
.joy-editor-container {
  width: 100%;
  min-height: 200px;
}

.joy-editor-container .tiny-fluent-editor {
  height: 100%;
}

.joy-editor-container .ck-editor__editable {
  min-height: calc(100% - 40px);
}
</style>
