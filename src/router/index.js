import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomePage.vue'
import Adduser from '@/views/AddUser.vue'
import Users from '@/views/UsersIndex.vue'
import LogIn from '@/views/LogIn.vue'
import RolesIndex from '@/views/roles/RolesIndex.vue'
import AdminsIndex from '@/views/SystemAdmins/AdminsIndex.vue'
import PermisionsIndex from '@/views/permisions/PermisionsIndex.vue'
import { getCookie } from '@/services/cookies'
// import { usePolicy } from '@/composables/usePolicy';
// const { can } = usePolicy();


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/add-user',
      name: 'add-user',
      component: Adduser
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/login',
      name: 'login',
      component: LogIn
    },
    {
      path: '/roles',
      name: 'roles',
      component: RolesIndex
    },
    {
      path: '/admins',
      name: 'admins',
      component: AdminsIndex
    },
    {
      path: '/permisions',
      name: 'permisions',
      component: PermisionsIndex
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
function isAuthenticated() {
  // return !!localStorage.getItem('auth');  // Check for a token in localStorage (or any auth status)
  return !!getCookie('auth');
}
router.beforeEach((to, from, next) => {
  if(to.name !== 'login' && !isAuthenticated()) next({name: 'login'})
  else next()
  
})
// router.beforeEach((to, from, next) => {
//   // const userRole = 'editor'; // Get the user's role from your auth logic
//   if (to.meta.resource && !can(to.meta.resource, to.meta.action)) {
//     next('/unauthorized'); // Redirect if unauthorized
//   } else {
//     next();
//   }
// });
export default router
