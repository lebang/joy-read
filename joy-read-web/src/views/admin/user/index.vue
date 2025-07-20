<script setup>
import { ref, onBeforeMount } from 'vue'
import { getUsers } from '@apis/user'
import { useRouter } from 'vue-router'

const tableData = ref([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const fetchData = async () => {
  const { response, loading } = await getUsers({ currentPage: currentPage.value, pageSize: pageSize.value })
  console.log('response:', response)
  const { rows, pagination } = response
  tableData.value = rows || []
  total.value = pagination.total || 0
}

onBeforeMount(() => {
  fetchData();
})

const handleCurrentChange = (val) => {
  currentPage.value = val
  fetchData()
}

const handleSizeChange = (val) => {
  pageSize.value = val
  currentPage.value = 1
  fetchData()
}
</script>

<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="username" label="名称" />
    <el-table-column prop="nickname" label="昵称" />
    <el-table-column prop="gender" label="性别" :formatter="(r, c, v) => {
      const map = {
        0: '女',
        1: '男',
        2: '-'
      }
      return map?.[v] ?? '-';
    }" />
    <el-table-column prop="role" label="角色" />
    <el-table-column label="操作" min-width="120">
      <template #default="scope">
        <!-- <el-button link type="primary" size="small" @click="onEdit(scope.row.id)">Edit</el-button>
      <DeleteConfirm @delete="onDelete(scope.row.id)"></DeleteConfirm> -->
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