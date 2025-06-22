<script setup>
  import Sidebar from '@views/admin/components/sidebar/index.vue'
  import Header from '@views/admin/components/header/index.vue'

  import Article from '@views/admin/article/index.vue'
  import Course from '@views/admin/course/index.vue'
  defineOptions({
    name: 'Admin',
  })
</script>
<template>
  <nav class="navbar navbar-expand navbar-light shadow-sm fixed-top g-nav">
    <Header></Header>
  </nav>
  <div class="container-fluid g-main">
    <div class="bd-wrap">
      <div class="bd-sidebar">
        <Sidebar></Sidebar>
      </div>
      <div class="bd-main">
        <router-view>
          <Article></Article>
        </router-view>
      </div>
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
  min-height: calc(100vh - 58px);
  display: flex; // 设置为 flex 布局
  flex-direction: column; // 垂直排列子元素
}
.bd-wrap{
  display: flex;
  height: 100%;
  flex: 1; // 让 bd-wrap 占据剩余高度
}
.bd-sidebar {
  padding: 0px;

  .sidebar-menu {
    padding-top: 10px;
  }
}
.bd-main{
  padding: 20px;
  flex: 1;
}
</style>