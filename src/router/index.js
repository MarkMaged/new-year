import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  // أضف باقي المسارات هنا
]

const router = createRouter({
  history: createWebHashHistory(), // 🔹 hash mode لتجنب 404 على GitHub Pages
  routes,
})

export default router
