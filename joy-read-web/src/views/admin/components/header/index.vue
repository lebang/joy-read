<script setup>
import logo from '@assets/vue.svg'
defineOptions({
  name: 'Header'
})
</script>

<template>
  <div class="container-fluid" >
    <a class="navbar-brand" href="javascript:;">
      <img :src="logo" class="logo" />
      <span>Joy Read</span>
    </a>
  
    <!-- <div class="navbar-nav-scroll">
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
    </div>   -->
    <ul class="navbar-nav ml-md-auto">
      <li class="nav-item">
        <a class="nav-link" href="#">链接</a>
      </li>
    </ul>
  </div>
</template>