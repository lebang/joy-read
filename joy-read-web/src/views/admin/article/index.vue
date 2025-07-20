<script setup>
import { onMounted, ref, onBeforeMount } from 'vue'
import { getArticles, deleteArticle } from '@apis/article'
import { useRouter } from 'vue-router'
import DeleteConfirm from '@components/delete-confirm/index.vue'

defineOptions({
  name: 'Article'
})

const router = useRouter()

const tableData = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const fetchData = async () => {
  const { response, loading } = await getArticles({ currentPage: currentPage.value, pageSize: pageSize.value })
  const { rows, pagination } = response
  tableData.value = rows || []
  total.value = pagination.total || 0
}

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchData()
}

const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1
  fetchData()
}

onBeforeMount(() => {
  fetchData()
})

const onDetail = () => {
  console.log('click')
}

const onEdit = (id) => {
  router.push({
    name: 'admin-articles-detail',
    params: { id }
  })
}

const onDelete = async(id) => {
  const { response, error } = await deleteArticle(id) 
  console.log('response:', response)
  fetchData();
}

</script>

<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="id" label="id" />
    <el-table-column prop="title" label="标题" />
    <el-table-column label="内容">
      <template #default="scope">
        <div class="content" v-html="scope.row?.content"></div>
      </template>
    </el-table-column>
    <el-table-column label="操作" min-width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="onEdit(scope.row.id)">Edit</el-button>
       <DeleteConfirm @delete="onDelete(scope.row.id)"></DeleteConfirm>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
    :current-page="currentPage"
    :page-sizes="[10, 20, 30, 40]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  />
</template>

<style lang="less" scoped>
.content {
  height: 30px;
}
</style>
