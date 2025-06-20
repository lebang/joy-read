<!-- CollapseControl.vue -->
<script setup>
import { ArrowRight, ArrowLeft } from '@element-plus/icons-vue'

defineProps({
  isCollapse: {
    type: Boolean,
    required: true
  }
})

defineEmits(['update:isCollapse'])
</script>

<template>
  <el-radio-group 
    :model-value="isCollapse" 
    class="cop-wrap"
    @update:model-value="$emit('update:isCollapse', $event)"
  >
    <el-radio v-if="isCollapse" :value="false">
      <el-icon><ArrowRight /></el-icon>
    </el-radio>
    <el-radio v-if="!isCollapse" :value="true">
      <el-icon><ArrowLeft /></el-icon>
    </el-radio>
  </el-radio-group>
</template>
