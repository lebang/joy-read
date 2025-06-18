<script setup>
  import Aside from '@views/admin/components/aside/index.vue'
  import '@assets/bootstrap/bootstrap.css'
  defineOptions({
    name: 'Admin',
  })
</script>
<template>
  <nav class="navbar navbar-expand navbar-light fixed-top">
    <div class="container-fluid" >
      <a class="navbar-brand" href="#">导航</a>
    
      <div class="navbar-nav-scroll">
        <ul class="navbar-nav bd-navbar-nav flex-row">
          <li class="nav-item">
            <a class="nav-link" href="#">链接</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">链接</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">链接</a>
          </li>    
        </ul>
      </div>  
      <ul class="navbar-nav ml-md-auto">
        <li class="nav-item">
          <a class="nav-link" href="#">链接</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">链接</a>
        </li>
      </ul>
    </div>
  </nav>
  <div class="container-fluid" style="margin-top:60px">
    <div class="row">
      <div class="col-sm-3">
        <ul class="nav nav-pills flex-column">
          <li class="nav-item">
            <a class="nav-link active" href="#">激活状态</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">链接</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">链接</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">禁用</a>
          </li>
        </ul>
      </div>
      <div class="col-sm-9"></div>
    </div>
  </div>
</template>

<style lang="less">

</style>