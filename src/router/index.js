import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/Changelog.vue'
import NotesView from '../views/NotesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/changelog',
      name: 'changelog',
      component: AboutView
    },
    {
      path: '/notes',
      name: 'notes',
      component: NotesView, 
    },
  ]
})

export default router
