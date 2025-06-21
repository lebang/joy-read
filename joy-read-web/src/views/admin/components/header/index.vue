<script setup>
import logo from '@assets/vue.svg'
import { ref, unref, computed } from 'vue';
import { IconUserFilled } from '@src/setup/icons.js'
import { useUserStore } from '@store/index'
  
defineOptions({
  name: 'Header'
})

const userIconUrl = ref('')
const userStore = useUserStore()
const userInfo = computed(() => userStore.userInfo)

const userIconRef = ref()
const userPopoverRef = ref()
const onUserIconClickOutside = () => {
  unref(userPopoverRef)?.userPopoverRef?.delayHide();
}
</script>

<template>
  <div class="container-fluid">
    <a class="navbar-brand" href="javascript:;">
      <img :src="logo" class="logo" />
      <span>Joy Read</span>
    </a>

    <ul class="navbar-nav ml-md-auto">
      <li class="nav-item">
        <el-avatar ref="userIconRef" v-click-outside="onUserIconClickOutside" :icon="IconUserFilled" :size="30"
          :src="userIconUrl">
          {{ userInfo.username }}
        </el-avatar>

        <el-popover
          ref="userPopoverRef"
          :virtual-ref="userIconRef"
          trigger="click"
          title="With title"
          virtual-triggering
        >
          <span> Some content </span>
        </el-popover>
      </li>
    </ul>
  </div>
</template>