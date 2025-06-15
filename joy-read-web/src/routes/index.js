import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'
import { createRouter, createWebHashHistory } from 'vue-router'

// const routes = [
//   {
//     path: '/',
//     redirect: '/login'
//   },
//   {
//     path: '/login',
//     name: 'Login',
//     component: () => import('@views/login/index.vue')
//   },
// ]

const pages = import.meta.glob('@views/**/page.js', {
  eager: true,
  import: 'default',
})

const comps = import.meta.glob('@views/**/index.vue')

const routes = Object.entries(pages).map(([filePath, meta]) => {
  const componentPath = filePath.replace('page.js', 'index.vue')
  const routePath = filePath.replace(/\/src\/views|\/page\.js/g, '') || '/'
  const name = filePath.split('/').filter(Boolean).join('-') || 'index'

  return {
    path: routePath,
    name,
    component: comps[componentPath],
    meta,
  }
})

console.log('routes:', routes)

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
