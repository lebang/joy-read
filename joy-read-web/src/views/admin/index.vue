<script setup>
  import Aside from '@views/admin/components/aside/index.vue'
  import Head from '@views/admin/components/head/index.vue'
  defineOptions({
    name: 'Admin',
  })
</script>
<template>
  <div class="container">
    <div class="header">
      <Head />
    </div>
    <div class="main">
      <div class="aside">
        <Aside />
      </div>
      <div class="content"></div>
    </div>
  </div>
</template>

<style lang="less">
  .container {
     height: 100vh;
     box-sizing: border-box;
     overflow: hidden;
    .header {
      width: 100%;
      height: 80px;
      border: 1px solid #f3f3f3;
      border-radius: 2px;
      box-sizing: border-box;
      z-index: 999;
    }
    .main {
      display: flex;
      min-height: calc(100% - 80px);
      overflow-x: hidden;
      overflow-y: auto;
      max-height: 1000px;
      .aside {
        width: 200px;
        border-right: 1px solid #f3f3f3;
      }
      .content {
        width: 100%;
      }
    }
  }
</style>