<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <div>
    <div class="card">
      <el-button @click="count++">count is {{ count }}</el-button>
    </div>
  </div>
</template>

<style scoped>

</style>
