<script setup>
import { ref } from 'vue'
import CollapseControl from './CollapseControl.vue'

defineOptions({
  name: 'Sidebar',
})

const isCollapse = ref(false)

const props = defineProps({
  menuDatas: {
    type: Array,
    required: true
  },
  navigateTo: {
    type: Function,
    required: true
  },
  activeIndex: {
    type: String,
    default: '1'
  }
})

</script>
<template>
  <el-menu :default-active="props.activeIndex" class="sidebar-menu" :collapse="isCollapse">
    <el-menu-item v-for="(menu, index) in props.menuDatas" :index="index + ''" :key="index" @click="props.navigateTo(menu.routeName)">
      <el-icon>
        <component :is="menu.icon" />
      </el-icon>
      <template #title>{{ menu.text }}</template>
    </el-menu-item>

    <CollapseControl v-model:isCollapse="isCollapse" />
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
