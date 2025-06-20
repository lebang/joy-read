<script setup>
import { ref } from 'vue'
import {
  Grid,
  UserFilled,
  Tools,
  InfoFilled,
} from '@element-plus/icons-vue'

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
  icon: Grid,
  text: '仪表盘'
}, {
  icon: UserFilled,
  text: '管理员'
}, {
  icon: Tools,
  text: '系统工具'
}, {
  icon: InfoFilled,
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
    <el-menu-item v-for="(menu,index) in menuDatas" :index="index+''">
      <el-icon>
        <component :is="menu.icon" />
      </el-icon>
      <template #title>{{ menu.text }}</template>
    </el-menu-item>

    <el-radio-group v-model="isCollapse" class="cop-wrap">
      <el-radio v-if="isCollapse" :value="false"><el-icon><ArrowRight /></el-icon></el-radio>
      <el-radio v-if="!isCollapse" :value="true"><el-icon><ArrowLeft /></el-icon></el-radio>
    </el-radio-group>
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
