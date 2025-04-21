import { createRouter, createWebHistory } from 'vue-router'
import FeedbackView from '../components/feedback.vue'
import NewsView from '../components/news.vue'
import MainView from '../components/main.vue'
import AddNewsView from '../components/addNews.vue'

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainView
  },
  {
    path: '/news',
    name: 'news',
    component: NewsView,
    meta: { requiresAuth: false }
  },
  {
    path: '/feedback',
    name: 'fedback',
    component: FeedbackView,
    meta: { requiresAuth: false }
  },
  {
    path: '/addnews',
    name: 'addnews',
    component: AddNewsView,
    meta: { requiresAuth: false }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router