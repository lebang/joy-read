import { customRef } from 'vue'

export const loading = customRef((track, trigger) => {
  let count = 0
  return {
    get() {
      track()
      return count > 0
    },
    set(value) {
      count += value ? 1 : -1
      trigger()
    },
  }
})