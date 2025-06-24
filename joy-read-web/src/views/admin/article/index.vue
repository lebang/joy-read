<script setup>
import { onMounted, ref } from 'vue'
import { getArticles } from '@apis/article'
import { useRouter } from 'vue-router'
defineOptions({
  name: 'Article'
})

const router = useRouter()

const tableData = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const fetchData = async () => {
  try {
    const res = await getArticles({ currentPage: currentPage.value, pageSize: pageSize.value })
    const { rows, pagination } = res
    tableData.value = rows || []
    total.value = pagination.total || 0
  } catch (error) {
    console.error('获取文章数据失败:', error)
  }
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

onMounted(() => {
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

</script>

<template>
    <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="id" label="id" />
    <el-table-column prop="title" label="标题" />
    <el-table-column prop="content" label="内容" />
    <el-table-column fixed="right" label="Operations" min-width="120">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="onDetail">
          Detail
        </el-button>
        <el-button link type="primary" size="small" @click="onEdit(scope.row.id)">Edit</el-button>
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
