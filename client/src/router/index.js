import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
var auth = require('../scripts/auth');
var cookie = require('../scripts/cookies');

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile/:uid',
    name: 'UserProfile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    redirect: () => {
      var uid = cookie.getCookie('user');
      console.log(uid);
      if(uid === "{}" || uid === ""){
        return {name: "Login"}
      }else{
        return {name: "UserProfile", params: {'uid':JSON.parse(uid).msg._id}}
      }
    }
  },
  {
    path: '/messages',
    name: 'Messages',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Messages.vue')
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//navigation guards
router.beforeEach((to, from, next) => {
  if((to.name === 'Profile' || to.name === 'Messages') && !auth.isAuthenticated()) next({name: 'Login'})
  if(to.name === 'Login' && auth.isAuthenticated()) next({name: 'Home'})
  else next()
})

export default router
