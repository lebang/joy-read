<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Editor from '@components/editor/index.vue'
import { getArticle, updateArticle } from '@apis/article.js'

const route = useRoute()
const router = useRouter()
const { id: articleId } = route.params
const isLoading = ref(false)
const articleForm = ref(null)
const articleData = reactive({
  id: 'new',
  title: '',
  content: ''
})

const checkTitle = (rule, value, callback) => {
    if (!value) {
      return callback(new Error('请填写内容'))
    } else {
      callback()
    }
  }

const rules = {
  title: [
    { required: true, validator: checkTitle, trigger: 'blur' }
  ],
  content: [
    { validator: checkTitle, trigger: 'blur' }
  ]
}

onMounted(async () => {
  if (articleId && articleId !== 'new') {
    isLoading.value = true
    const { error, response, loading } = await getArticle({ id: articleId })
    isLoading.value = false
    if (error) {
      console.error('获取文章失败:', err)
      return;
    }
    const { title, content, id } = response.article
    articleData.id = id
    articleData.title = title
    articleData.content = content
  }
})

// 提交文章
const submitArticle = async () => {
  try {
    isLoading.value = true
    const valid = await articleForm.value.validate()
    if (!valid) return

    const { error } = await updateArticle(articleData)
    if (error) {
      return
    }

    // 保存成功后返回列表页
    router.push({ name: 'admin-articles' })
  } catch (err) {
    console.error('保存失败:', err)
  } finally {
    isLoading.value = false
  }
}

// 返回列表
const handleBack = () => {
  router.push({ name: 'admin-articles' })
}

const onEditorChange = (content, editor) => {
  // console.log('content:', content)
  console.log('editor:', editor)
}
</script>

<template>
  <div class="article-detail-container" v-loading="isLoading">
    <div class="article-header">
      <h1>{{ articleId === 'new' ? '创建新文章' : '编辑文章' }}</h1>
      <div class="article-id" v-if="articleId !== 'new'">
        文章ID: {{ articleId }}
      </div>
    </div>

    <el-form label-width="100px" 
      ref="articleForm" 
      :model="articleData"
      :rules="rules"
      :validate-on-rule-change="false"
      @keyup.enter="submitArticle">
      <el-form-item label="文章标题" prop="title">
        <el-input v-model="articleData.title" placeholder="请输入文章标题" />
      </el-form-item>

      <el-form-item label="文章内容"  prop="content">
        <Editor v-model="articleData.content" @onChange="onEditorChange"></Editor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitArticle" :loading="isLoading">
          {{ isLoading ? '保存中...' : '保存文章' }}
        </el-button>
        <el-button @click="handleBack" style="margin-left: 10px;">返回列表</el-button>
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