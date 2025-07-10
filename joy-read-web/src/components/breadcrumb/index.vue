<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// 获取所有路由配置（使用const声明不变的值）
const allRoutes = router.getRoutes()

/**
 * 生成面包屑数据
 */
const breadcrumbs = computed(() => {
  if (!route.name) return []

  const nameSegments = route.name.toString().split('-')
  const result = nameSegments.reduce((acc, segment, index) => {
    const currentName = acc.length > 0 ? `${acc[acc.length - 1].name}-${segment}` : segment
    const matchedRoute = allRoutes.find(r => r.name === currentName)

    if (matchedRoute) {
      const { title=false } = matchedRoute?.meta || {}
      const isLast = index === nameSegments.length - 1
      const hasParams = matchedRoute?.path?.includes('/:')
      acc.push({
        text: title || segment,
        name: currentName,
        params: hasParams ? route.params : {},
        disabled: isLast
      })
    }

    return acc
  }, [])

  return result
})

/**
 * 处理面包屑项点击
 */
const handleClick = (item) => {
  if (!item.disabled && item.name) {
    router.push({
      name: item.name,
      params: item.params || {}
    })
  }
}
</script>

<template>
  <el-breadcrumb separator="/" class="joy-breadcrumb">
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbs"
      :key="index"
      :class="{ 'is-disabled': item.disabled }"
    >
      <span
        class="breadcrumb-item"
        :class="{ 'is-link': !item.disabled }"
        @click="handleClick(item)"
      >
        {{ item.text }}
      </span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style scoped>
.joy-breadcrumb {
  padding: 16px 0;
  background-color: var(--el-bg-color);
}

.breadcrumb-item {
  display: inline-block;
  transition: color 0.2s;

  &.is-link {
    cursor: pointer;
    color: var(--el-color-primary);

    &:hover {
      color: var(--el-color-primary-light-3);
    }
  }

  &:not(.is-link) {
    cursor: default;
    color: var(--el-text-color-regular);
  }
}
</style>
