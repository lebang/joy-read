const admin = [{
  path: '/admin',
  name: 'admin',
  component: () => import('@views/admin/index.vue'),
  meta: {
    title: '管理后台'
  },
  children: [
    {
      path: '/admin/users',
      name: 'admin-users',
      component: () => import('@views/admin/user/index.vue'),
      meta: {
        title: '用户列表'
      }
    },
    {
      path: '/admin/articles',
      name: 'admin-articles',
      component: () => import('@views/admin/article/index.vue'),
      meta: {
        title: '文章列表'
      }
    },
    {
      path: '/admin/articles/:id',
      name: 'admin-articles-detail',
      component: () => import('@views/admin/article/detail.vue'),
      meta: {
        title: '文章详情'
      }
    },
    {
      path: '/admin/courses',
      name: 'admin-courses',
      component: () => import('@views/admin/course/index.vue'),
      meta: {
        title: '课程列表'
      }
    },
    {
      path: '/admin/courses/:id',
      name: 'admin-courses-detail',
      component: () => import('@views/admin/course/detail.vue'),
      meta: {
        title: '课程详情'
      }
    }
  ]
}]

export { admin } 