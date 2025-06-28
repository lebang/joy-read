<script setup>
import { ref, watch, onMounted } from 'vue'
import FluentEditor from '@opentiny/fluent-editor'
import '@opentiny/fluent-editor/style.css';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  theme: {
    type: String,
    default: 'snow'
  },
  onChange: {
    type: Function,
    default: () => {}
  }
})

// 定义组件的事件
const emits = defineEmits(['update:modelValue', 'onChange'])

const editorRef = ref()
let editor = null;
onMounted(() => {
  editor = new FluentEditor(editorRef.value, {
    theme: 'snow',
  });

  // 初始化编辑器内容
  editor.root.innerHTML = props.modelValue

  // 监听编辑器内容变化
  editor.on('text-change', () => {
    const content = editor.root.innerHTML
    emits('update:modelValue', content)
    emits('onChange', content, editor)
  })
})

// 监听 props.modelValue 的变化，同步到编辑器
watch(() => props.modelValue, (newValue) => {
  if (editor && editor.root.innerHTML !== newValue) {
    editor.root.innerHTML = newValue
  }
})

</script>

<template>
  <div class="joy-editor-container">
    <div id="editor" ref="editorRef" />
  </div>
</template>

<style>
.joy-editor-container {
  width: 100%;
  min-height: 200px;
}

.joy-editor-container .ql-container {
  min-height: 400px;
}
</style>
