<script setup>
import { ref, onBeforeMount } from 'vue'
import { getCourses, deleteCourse } from '@apis/course'
import { useRouter } from 'vue-router'
import DeleteConfirm from '@components/delete-confirm/index.vue'
defineOptions({
  name: 'Cousrse'
})

const tableData = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const router = useRouter()


const fetchData = async () => {
  const { response, loading } = await getCourses({ currentPage: currentPage.value, pageSize: pageSize.value })
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

const onEdit = (id) => {
  router.push({
    name: 'admin-courses-detail',
    params: { id }
  })
}

const onDelete = async(id) => {
  const { response, error } = await deleteCourse(id) 
  console.log('response:', response)
  fetchData();
}
</script>

<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column fixed prop="id" label="id" />
    <el-table-column prop="name" label="标题" />
    <el-table-column label="分类" >
      <template #default="scope">
        <span v-default="scope.row?.category?.name"></span>
      </template>
    </el-table-column>
    <el-table-column label="作者" >
      <template #default="scope">
        <span v-default="scope.row?.user?.username"></span>
      </template>
    </el-table-column>
    <el-table-column label="内容" >
      <template #default="scope">
        <span v-default="scope.row?.content"></span>
      </template>
    </el-table-column>
    <el-table-column label="Operations" min-width="120">
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
