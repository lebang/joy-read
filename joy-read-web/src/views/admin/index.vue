<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import Sidebar from '@views/admin/components/sidebar/index.vue'
import Header from '@views/admin/components/header/index.vue'
import Breadcrumb from '@src/components/breadcrumb/index.vue'
import { IconGrid, IconUserFilled, IconTools, IconInfoFilled, IconList, IconManagement } from '@src/setup/icons.js'

defineOptions({
  name: 'Admin',
})

const menuDatas = [{
  icon: IconGrid,
  text: '仪表盘'
}, {
  icon: IconUserFilled,
  text: '用户管理',
  routeName: 'admin-users'
}, {
  icon: IconList,
  text: '文章管理',
  routeName: 'admin-articles'
}, {
  icon: IconManagement,
  text: '课程管理',
  routeName: 'admin-courses'
}, {
  icon: IconTools,
  text: '系统工具'
}, {
  icon: IconInfoFilled,
  text: '关于我们'
}];

const router = useRouter();

const activeIndex = computed(() => {
  const currentRouteName = router.currentRoute.value.name
  const menuItem = menuDatas.find(menu => {
    return currentRouteName.startsWith(menu.routeName)
  })
  return menuItem ? menuDatas.indexOf(menuItem).toString() : '0'
})

const navigateTo = (routeName) => {
  router.push({ name: routeName });
};
</script>
<template>
  <nav class="navbar navbar-expand navbar-light shadow-sm fixed-top g-nav">
    <Header></Header>
  </nav>
  <div class="container-fluid g-main">
    <div class="bd-wrap">
      <div class="bd-sidebar">
        <Sidebar :menuDatas="menuDatas" :activeIndex="activeIndex" :navigateTo="navigateTo"></Sidebar>
      </div>
      <div class="bd-main">
        <div class="breadcrumb-container">
          <Breadcrumb />
        </div>
        <router-view> </router-view>
      </div>
    </div>
  </div>
</template>

<style lang="less">
.g-nav {
  border-bottom: 1px solid #f3f3f3;
  background: #fff;
}

.g-main {
  margin-top: 58px;
  min-height: calc(100vh - 58px);
  display: flex; // 设置为 flex 布局
  flex-direction: column; // 垂直排列子元素
}

.bd-wrap {
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

.bd-main {
  padding: 20px;
  flex: 1;
  
  .breadcrumb-container {
    margin-bottom: 16px;
    padding: 12px 16px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  }
}
</style>