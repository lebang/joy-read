import { createApp } from 'vue';
import { ElTooltip } from 'element-plus'

/**
 * 判断文本是否溢出
 */
function isTextOverflowing(element) {
  const style = window.getComputedStyle(element)
  const range = document.createRange()
  range.selectNodeContents(element)
  const contentWidth = range.getBoundingClientRect().width
  const containerWidth = parseFloat(style.width)
  return contentWidth > containerWidth
}

/**
 * 创建tooltip，这里采用element-plus的tooltip组件
 * 使用案例：
 * <span v-tootip:auto>xxxxxxx</span> tooltip 自定判断文本是否溢出，溢出了鼠标悬浮才会展示tooltip
 * <span v-tootip>xxxxxxx</span> tooltip 直接悬浮展示tooltip
 * @param el
 * @param binding
 */
const createTooltip = (el, binding) => {
  const arg = binding.arg
  const isShow = arg === 'auto' ? isTextOverflowing(el) : true // binding.value || true
  // 创建组件，显示tooltip
  if (isShow) {
    // 判断是否有根元素，存在，则移除
    const elRoot = document.querySelector('#_tooltip_root')
    if (elRoot) {
      elRoot.remove()
    }
    // 初始化 根元素
    el._tiproot = null
    el._tipapp = null
    const id = '_tooltip_root'
    const _tiproot = document.createElement('div')
    _tiproot.id = id
    // 通过createApp 创建实例组件
    const isString = typeof binding.value == 'string'
    const bindingObj = isString ? { content: binding.value } : binding.value;
    const { trigger='hover', placement='top', content='' } = bindingObj || {}
    const _tipapp = createApp(ElTooltip, {
      trigger,
      virtualRef: el,
      rawContent: true,
      placement,
      virtualTriggering: true,
      content
    })
    el._tiproot = _tiproot
    el._tipapp = _tipapp
    // body添加根元素
    document.body.appendChild(_tiproot)
    // 将新组件挂载到根元素
    if (_tipapp && _tiproot) {
      el._tipapp.mount('#' + id)
    }
  }
}

/**
 * 文本溢出则显示省略号并悬浮鼠标展示tooltip
 */
export default (el, binding) => {
  // 文本溢出则展示省略号
  el.style.whiteSpace = 'nowrap'
  el.style.overflow = 'hidden'
  el.style.textOverflow = 'ellipsis'

  // 创建tooltip
  createTooltip(el, binding)
}

