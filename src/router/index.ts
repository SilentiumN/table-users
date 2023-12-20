import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import UserEditView from '@/views/UserEditView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'form',
    component: UserEditView,
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('@/views/UserTableView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
