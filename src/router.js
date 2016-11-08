import Vue from 'vue';
import VueRouter from 'vue-router';

import Layout from './layout/layout.vue';

import Dash from './views/dash.vue';
import Login from './views/login.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  base: __dirname,
  routes: [
    {path: '/', component: Layout, meta: {requiresAuth: true}, children: [
      {path: '/', component: Dash},
     //{path: '/shipment', component: Shipment},
     //{path: '/user', component: User},
     //{path: '/company', component: Company},
     //{path: '/blockchain', component: Blockchain},
    ]},
    {path: '/login', component: Login}
  ]
});

export default router;