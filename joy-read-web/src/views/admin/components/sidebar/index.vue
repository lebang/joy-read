<script setup>
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
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
</script>
<template>
  <el-menu
    default-active="1"
    class="sidebar-menu"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><Location /></el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Group One</span></template>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-menu-item index="2">
      <el-icon><IconMenu /></el-icon>
      <template #title>Navigator Two</template>
    </el-menu-item>
    <el-menu-item index="3">
      <el-icon><Document /></el-icon>
      <template #title>Navigator Three</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><Setting /></el-icon>
      <template #title>Navigator Four</template>
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