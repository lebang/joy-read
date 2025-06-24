import { createRouter, createWebHashHistory } from 'vue-router'
import { emiter } from '@utils/emiter'

// const pagesContext = require.context('@views', true, /\/page\.js$/);
// const pages = {};

// pagesContext.keys().forEach((key) => {
//   const page = pagesContext(key);
//   pages[key] = page.default; // Assuming each module exports default
// });

// console.log('pages:', pages);

// const compsContext = require.context('@views', true, /\/index\.vue$/);
// const comps = {};

// compsContext.keys().forEach((key) => {
//   comps[key] = () => compsContext(key);
// });

// console.log('comps:', comps);

// console.log('require.context:', require?.context)
// console.log('import.meta.glob:', import.meta?.env?.MODE === 'vite')

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@views/login/index.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('@views/admin/index.vue'),
    children: [
      {
        path: '/admin/articles',
        name: 'admin-articles',
        component: () => import('@views/admin/article/index.vue'),
      },
      {
        path: '/admin/articles/:id',
        name: 'admin-articles-detail',
        component: () => import('@views/admin/article/detail.vue'),
      },
      {
        path: '/admin/courses',
        name: 'admin-courses',
        component: () => import('@views/admin/course/index.vue')
      }
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@views/register/index.vue'),
  },
]

// const pages = import.meta.glob('@views/**/page.js', {
//   eager: true,
//   import: 'default',
// })
// const comps = import.meta.glob('@views/**/index.vue')

// const routes = Object.entries(pages).map(([filePath, meta]) => {
//   const componentPath = filePath.replace('page.js', 'index.vue')
//   const routePath = filePath.replace(/\/src\/views|\/page\.js/g, '') || '/'
//   const name = routePath.split('/').filter(Boolean).join('-') || 'index'

//   return {
//     path: routePath,
//     name,
//     component: comps[componentPath],
//     meta,
//   }
// })
// console.log('routes:', routes)

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

const emitOnRoutes = ['login', 'admin']

emitOnRoutes.forEach((name) => {
  emiter.on(`router:${name}`, () => {
    router.push({
      name,
    })
  })
})

export default router
