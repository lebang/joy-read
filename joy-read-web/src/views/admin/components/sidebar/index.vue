<script setup>
import { ref } from 'vue'
import {
  Grid as IconGrid,
  UserFilled as IconUserFilled,
  Tools as IconTools,
  InfoFilled as IconInfoFilled,
  List as IconList,
  Management as IconManagement
} from '@element-plus/icons-vue'
import CollapseControl from './CollapseControl.vue'

defineOptions({
  name: 'Sidebar',
})

const isCollapse = ref(false)

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}

const menuDatas = [{
  icon: IconGrid,
  text: '仪表盘'
}, {
  icon: IconUserFilled,
  text: '用户管理'
}, {
  icon: IconList,
  text: '文章管理'
},{
  icon: IconManagement,
  text: '课程管理'
},{
  icon: IconTools,
  text: '系统工具'
}, {
  icon: IconInfoFilled,
  text: '关于我们'
}]

</script>
<template>
  <el-menu
    default-active="1"
    class="sidebar-menu"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item v-for="(menu,index) in menuDatas" :index="index+''" :key="index">
      <el-icon>
        <component :is="menu.icon" />
      </el-icon>
      <template #title>{{ menu.text }}</template>
    </el-menu-item>

    <CollapseControl 
      v-model:isCollapse="isCollapse"
    />
  </el-menu>
</template>

<style lang="less">
.sidebar-menu:not(.el-menu--collapse) {
  width: 220px;

}
.sidebar-menu {
  min-height: 400px;
  height: 100%;
}
.cop-wrap {
  position: absolute;
  right: 0px;
  bottom: 2px;
 .el-radio .el-radio__input {
    display: none !important;
  }
}
</style>
