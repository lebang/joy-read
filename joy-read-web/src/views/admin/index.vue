<script setup>
  import Sidebar from '@views/admin/components/sidebar/index.vue'
  import Header from '@views/admin/components/header/index.vue'
  defineOptions({
    name: 'Admin',
  })
</script>
<template>
  <nav class="navbar navbar-expand navbar-light shadow-sm fixed-top g-nav">
    <Header></Header>
  </nav>
  <div class="container-fluid g-main">
    <div class="row">
      <div class="col-sm-3 bd-sidebar">
        <Sidebar></Sidebar>
      </div>
      <div class="col-sm-9"></div>
    </div>
  </div>
</template>

<style lang="less">
.g-nav {
  border-bottom:1px solid #f3f3f3;
  background: #fff;
}
.g-main {
  margin-top: 58px;
}
.bd-sidebar {
  position: fixed;
  top: 58px;
  bottom: 0;
  left: 0;
  padding: 0px;
}
</style>