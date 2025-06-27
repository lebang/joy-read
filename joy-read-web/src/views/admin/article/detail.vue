<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Editor from '@components/editor/index.vue'

const route = useRoute()
const articleId = route.params.id

// 文章相关数据
const articleTitle = ref('')
const articleContent = ref('')
const isLoading = ref(false)
const isSaving = ref(false)

// 模拟从API获取文章数据
onMounted(async () => {
  if (articleId && articleId !== 'new') {
    isLoading.value = true
    try {
      // 这里应该是实际的API调用
      // const response = await fetchArticle(articleId)
      // articleTitle.value = response.title
      // articleContent.value = response.content
      // 模拟数据
      setTimeout(() => {
        articleTitle.value = '示例文章标题'
        articleContent.value = '<p>这是一篇示例文章的内容。</p>'
        isLoading.value = false
      }, 500)
    } catch (error) {
      console.error('获取文章失败:', error)
      isLoading.value = false
    }
  }
})

// 提交文章
const submitArticle = async () => {
  if (!articleTitle.value.trim()) {
    alert('请输入文章标题')
    return
  }
  
  if (!articleContent.value.trim()) {
    alert('请输入文章内容')
    return
  }
  
  isSaving.value = true
  try {
    // 这里应该是实际的API调用
    // await saveArticle({
    //   id: articleId !== 'new' ? articleId : undefined,
    //   title: articleTitle.value,
    //   content: articleContent.value
    // })
    
    // 模拟保存
    console.log('提交文章:', {
      id: articleId !== 'new' ? articleId : undefined,
      title: articleTitle.value,
      content: articleContent.value
    })
    
    setTimeout(() => {
      alert('文章保存成功!')
      isSaving.value = false
    }, 800)
  } catch (error) {
    console.error('保存文章失败:', error)
    alert('保存失败，请重试')
    isSaving.value = false
  }
}
</script>

<template>
  <div class="article-detail-container" v-loading="isLoading" >
    <div class="article-header">
      <h1>{{ articleId === 'new' ? '创建新文章' : '编辑文章' }}</h1>
      <div class="article-id" v-if="articleId !== 'new'">
        文章ID: {{ articleId }}
      </div>
    </div>
    
    <el-form label-width="100px">
      <el-form-item label="文章标题">
        <el-input
          v-model="articleTitle"
          placeholder="请输入文章标题"
        />
      </el-form-item>
      
      <el-form-item label="文章内容">
        <!-- <el-input
          v-model="articleContent"
          type="textarea"
          :rows="4"
          placeholder="请输入文章内容"
        /> -->
        <Editor v-model="articleContent"></Editor>
      </el-form-item>
      
      <el-form-item>
        <el-button
          type="primary"
          @click="submitArticle"
          :loading="isSaving"
        >
          {{ isSaving ? '保存中...' : '保存文章' }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.article-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.article-header {
  margin-bottom: 24px;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 16px;
}

.article-header h1 {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 500;
}

.article-id {
  font-size: 14px;
  color: #666;
}
</style>