import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import UserMgt from '../views/UserMgt/index.vue';
import RoomMgt from '../views/RoomMgt/index.vue';
import GoodsMgt from '../views/GoodsMgt/index.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/UserMgt',
  },
  {
    path: '/UserMgt',
    // name: 'UserMgt',
    component: UserMgt,
  },
  {
    path: '/RoomMgt',
    // name: 'RoomMgt',
    component: RoomMgt,
  },
  {
    path: '/GoodsMgt',
    // name: 'GoodsMgt',
    component: GoodsMgt,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
