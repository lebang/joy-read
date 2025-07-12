export default {
  mounted(el, binding) {
    const value = binding.value
    // 如果值为 null、undefined 或空字符串，则显示 "-"
    if (value === null || value === undefined || value === '') {
      el.textContent = '-'
    } else {
      el.textContent = value
    }
  },
  updated(el, binding) {
    this.mounted(el, binding) // 支持响应式更新
  },
}
