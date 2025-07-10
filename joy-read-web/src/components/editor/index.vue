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
    modules: {
      'toolbar': [
        [
          { header: [1, 2, 3, 4, 5, 6, false] },
          { font: ['songti', 'yahei', 'kaiti', 'heiti', 'lishu', 'mono'] },
          { size: ['12px', '14px', '16px', '18px', '20px', '24px', '32px', '36px', '48px'] },
          { lineheight: ['1', '1.2', '1.5', '1.75', '2', '3', '4', '5'] },
        ],
        ['bold', 'italic', 'strike', 'underline'],
        ['link', 'image'],
        // [{ color: [] }, { background: [] }],
        ['better-table'],
      ],
      'counter': true,
      'better-table': true,
      'i18n': {
          lang: 'zh-CN',
          langText: {
            'header': '段落格式',
            'normal': '正文',
            'h1': '标题1',
            'h2': '标题2',
            'h3': '标题3',
            'h4': '标题4',
            'h5': '标题5',
            'h6': '标题6',
          }
      },
    }
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

<style lang="less">
.joy-editor-container {
  width: 100%;
  min-height: 200px;
}

.joy-editor-container .ql-container {
  .ql-editor {
    min-height: 300px;
  }
}
</style>
