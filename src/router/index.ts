import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pokemons-list',
      name: 'pokemons-list',
      component: () => import('@/views/PokemonsListView.vue')
    }
  ]
})

export default router
