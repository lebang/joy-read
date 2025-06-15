<template>
  <div class="container">
    <div class="main">

    </div>
    <Aside />
    <Head />
  </div>
</template>
<script setup>
  import Aside from '@views/admin/components/aside/index.vue'
  import Head from '@views/admin/components/head/index.vue'
  defineOptions({
    name: 'Admin',
  })
</script>