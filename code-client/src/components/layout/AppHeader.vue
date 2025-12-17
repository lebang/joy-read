<script setup>
import { useAppStore } from '@/stores'

const appStore = useAppStore()
</script>

<template>
  <header class="header">
    <h2>{{ appStore.currentTitle }}</h2>
  </header>
</template>

<style scoped>
.header {
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
  padding: 0 20px;
  flex-shrink: 0;
}

.header h2 {
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .header {
    background-color: #1f1f1f;
    border-bottom-color: #333;
  }

  .header h2 {
    color: #e5e5e5;
  }
}
</style>
