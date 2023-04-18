import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import Login from '../views/LoginPage/index.vue';
import DataMgt from '../views/DataMgt.vue';
import UserMgt from '../views/UserMgt/index.vue';
import RoomMgt from '../views/RoomMgt/index.vue';
import GoodsMgt from '../views/GoodsMgt/index.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/DataMgt',
    component: DataMgt,
    children: [
      {
        path: 'UserMgt',
        component: UserMgt,
      },
      {
        path: 'RoomMgt',
        component: RoomMgt,
      },
      {
        path: 'GoodsMgt',
        component: GoodsMgt,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
