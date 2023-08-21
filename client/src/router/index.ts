import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path:'/auth/:type',
    component:()=>import('../views/LogReg.vue')
  },
  {
    path:'/home',
    component:()=>import('../views/Home.vue')
  },
  {
    path:'/create/:type',
    component:()=>import('../views/Create.vue')
  },
  {
    path:'/channel/:id',
    component:()=>import('../views/Channel.vue')
  },
  {
    path:'/post/:id',
    component:()=>import('../views/Post.vue')
  },
  { 
  path: '/:catchAll(.*)', 
  component: ()=>import('../components/any/404.vue') 
  },
  {
    path:'/',
    redirect:'/home'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
