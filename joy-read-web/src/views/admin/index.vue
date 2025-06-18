<script setup>
  import Aside from '@views/admin/components/aside/index.vue'
  import '@assets/bootstrap/bootstrap.css'
  defineOptions({
    name: 'Admin',
  })
</script>
<template>
  <nav class="navbar navbar-expand-sm bg-light navbar-light">
    <div class="container-fluid" >
      <a class="navbar-brand" href="#">导航</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavbar">
        <ul class="navbar-nav">
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
    </div>
  </nav>
  <div class="container-fluid" style="margin-top:30px">
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
            <a class="nav-link disabled" href="#">禁用</a>
          </li>
        </ul>
      </div>
      <div class="col-sm-9"></div>
    </div>
  </div>
</template>

<style lang="less">

</style>