<script setup>
import { onMounted, ref } from 'vue'
import { getArticles } from '@apis/article'
defineOptions({
  name: 'Article'
})

const tableData = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const handleClick = () => {
  console.log('click')
}

const fetchData = async () => {
  try {
    const res = await getArticles({ currentPage: currentPage.value, pageSize: pageSize.value })
    console.log('res 22:', res)
    const { rows, pagination } = res
    tableData.value = rows || []
    total.value = pagination.total || 0
  } catch (error) {
    console.error('获取文章数据失败:', error)
  }
}


// 页码改变时触发
const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchData()
}

// 每页显示条数改变时触发
const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1
  fetchData()
}

onMounted(() => {
  fetchData()
})


</script>

<template>
    <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="id" label="id" />
    <el-table-column prop="title" label="标题" />
    <el-table-column prop="content" label="内容" />
    <el-table-column fixed="right" label="Operations" min-width="120">
      <template #default>
        <el-button link type="primary" size="small" @click="handleClick">
          Detail
        </el-button>
        <el-button link type="primary" size="small">Edit</el-button>
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
