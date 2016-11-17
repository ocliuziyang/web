import Vue from 'vue'
import App from './app.vue';

import store from './store';
import router from './router';
import axios from 'axios';

import VueTables from 'vue-tables-2';

Vue.use(VueTables.client);

// check authentication
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!store.getters.isAuthenticated){
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }
  next()
});

// handle connection errors
axios.interceptors.response.use(res => (res), (error) => {
  let {response} = error;
  if (response.data && response.data.message){
    store.dispatch('notify', {text: response.data.message, type: 'danger'});
  } else if(response.data){
    store.dispatch('notify', {text: response.data, type: 'danger'});
  }
  return error
})

const app = {
  router,
  store,
  ...App
};

new Vue(app).$mount('#app');