import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import Login from '../views/LoginPage/index.vue';
import Main from '../views/MainPanel.vue';
import UserMgt from '../views/UserMgt/index.vue';
import RoomMgt from '../views/RoomMgt/index.vue';
import GoodsMgt from '../views/GoodsMgt/index.vue';
import GoodsView from '../views/GoodsView/index.vue';

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
    path: '/Main',
    component: Main,
    children: [
      {
        path: 'DataMgt',
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
      {
        path: 'CountsMgt',
        children: [
          {
            path: 'GoodsView',
            component: GoodsView,
          },
        ],
      },
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
