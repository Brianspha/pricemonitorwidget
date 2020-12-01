import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/list',
      name: 'list',
    },
    {
      path: '/edit/:id?',
      name: 'edit',
    },
    {
      path: '/*',
      redirect: { name: 'list' }
    }
  ],
  mode: 'abstract',
  linkActiveClass: 'active'
})
