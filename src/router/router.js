import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import { login } from '@/router/components.js'

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
    },
  ]
})
export default router