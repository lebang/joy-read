import { defineStore } from 'pinia'
import { ref, watchEffect, reactive } from 'vue'

export const useAppStore = defineStore('app', () => {
  const app = reactive({
    token: localStorage.getItem('token') || '',
  })

  watchEffect(() => {
    localStorage.setItem('token', app.token)
  })

  return {
    app,
  }
})
