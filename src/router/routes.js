
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/write', component: () => import('pages/Write.vue') },
      { path: '/push', component: () => import('pages/Push.vue') },
      { path: '/:menu', component: () => import('pages/List.vue') },
      { path: '/restaurants/:slug', component: () => import('pages/View.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
