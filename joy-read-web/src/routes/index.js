import { createRouter, createWebHashHistory } from 'vue-router'
import { emiter } from '@utils/emiter'

const pages = import.meta.glob('@views/**/page.js', {
  eager: true,
  import: 'default',
})
const comps = import.meta.glob('@views/**/index.vue')

const routes = Object.entries(pages).map(([filePath, meta]) => {
  const componentPath = filePath.replace('page.js', 'index.vue')
  const routePath = filePath.replace(/\/src\/views|\/page\.js/g, '') || '/'
  const name = routePath.split('/').filter(Boolean).join('-') || 'index'

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

const emitOnRoutes = ['login', 'admin'];

emitOnRoutes.forEach(name => {
  emiter.on(`router:${name}`, () => {
    router.push({
      name,
    })
  })
})

export default router
