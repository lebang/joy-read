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

// const userIconRef = ref()
// const userPopoverRef = ref()
// const onUserIconClickOutside = () => {
//   unref(userPopoverRef)?.userPopoverRef?.delayHide();
// }
</script>

<template>
  <div class="container-fluid">
    <a class="navbar-brand" href="javascript:;">
      <img :src="logo" class="logo" />
      <span>Joy Read</span>
    </a>

    <ul class="navbar-nav ml-md-auto">
      <li class="nav-item">
        <el-popover placement="bottom-end" popper-class="user-popper" :width="220" trigger="click">
          <template #reference>
            <el-avatar :icon="IconUserFilled" :size="30" :src="userIconUrl">
              {{ userInfo.username }}
            </el-avatar>
          </template>
          <el-card shadow="never" class="card-wrap" >
            <template #header>
              <span>{{ userInfo.username }}</span>
            </template>
            <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p>
            <template #footer>Footer content</template>
          </el-card>
        </el-popover>
      </li>
    </ul>
  </div>
</template>

<style lang="less">
.user-popper.el-popover.el-popper{
  padding: 0px;
}
.card-wrap {
  border: none;
}
</style>