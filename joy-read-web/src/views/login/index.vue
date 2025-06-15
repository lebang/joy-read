<template>
  <div class="common-layout">
    <el-container>
      <el-header></el-header>
      <el-main>
          <HelloWorld msg="Vite + Vue" />
      </el-main>
      <el-footer></el-footer>
    </el-container>

  </div>
</template>
<script setup>
  import HelloWorld from '@components/HelloWorld.vue'
  import { useRouter } from 'vue-router'
  defineOptions({
    name: 'Login',
  })

  const router = useRouter()
</script>