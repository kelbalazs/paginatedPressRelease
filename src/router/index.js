import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/ListArticles'
import Article from '@/views/ArticleDetails'

Vue.use(Router);

let baseRoutes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/article',
    name: 'article',
    component: Article,
    props: (route) => ({
      ...route.params
    })
  }
]

const router = new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: baseRoutes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

export default router
