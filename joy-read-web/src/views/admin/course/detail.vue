<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Editor from '@components/editor/index.vue'
import { getCourse, getCourses } from '@apis/course'

const route = useRoute()
const router = useRouter()
const { id: courseId } = route.params

const isLoading = ref(false)

onMounted(async () => {
  if (courseId && courseId !== 'new') {
    isLoading.value = true
    const { error, response, loading } = await getCourse({ id: courseId })
    isLoading.value = false
    if (error) {
      console.error('获取失败:', err)
      return;
    }
    console.log('response', response)
  }
})
</script>
<template>
  detail
</template>
