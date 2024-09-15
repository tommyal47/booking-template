import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Homepage.vue'
import Adduser from '@/views/Adduser.vue'
import Users from '@/views/Users.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/add_user',
      name: 'add_user',
      component: Adduser
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    // {
    //   // path: '/about',
    //   // name: 'about',
    //   // // route level code-splitting
    //   // // this generates a separate chunk (About.[hash].js) for this route
    //   // // which is lazy-loaded when the route is visited.
    //   // component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
