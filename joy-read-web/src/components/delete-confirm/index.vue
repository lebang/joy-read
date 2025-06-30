<template>
  <el-popconfirm title="Are you sure to delete this?" @confirm="handleDelete">
    <template #reference>
      <el-button link type="primary" size="small">Delete</el-button>
    </template>
  </el-popconfirm>
</template>

<script setup>

const emit = defineEmits(['delete'])

const handleDelete = async () => {
  emit('delete')
}
</script>