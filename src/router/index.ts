import { createRouter, createWebHistory } from 'vue-router';
import MainMenu from '@/views/MainMenu.vue';
import MazePlayer from '@/views/MazePlayer.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    name: 'MainMenu',
    component: MainMenu,
  }, {
    path: '/maze/:type/:difficulty',
    name: 'Maze',
    component: MazePlayer,
  }],
});

export default router;