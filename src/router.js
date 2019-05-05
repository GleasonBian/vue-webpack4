import Vue from 'vue'
import Router from 'vue-router'
import {resolve} from 'path';
Vue.use(Router)

const login = resolve => require(['@/components/login'], resolve);
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
    },
  ]
})
export default router