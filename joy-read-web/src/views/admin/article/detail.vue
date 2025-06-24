<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const articleId = route.params.id

</script>

<template>
  {{ articleId }}
</template>