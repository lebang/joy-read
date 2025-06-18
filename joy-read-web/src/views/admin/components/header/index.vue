<script setup>
defineOptions({
  name: 'Header'
})
</script>

<template>
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
</template>