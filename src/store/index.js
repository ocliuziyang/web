import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)

import auth from './vuex-auth';

const store = new Vuex.Store({
  modules: {
    auth
  }
});

// when the token is changed update HTTP and localStorage
store.subscribe((mutation, state) => {
  switch (mutation.type){
    case 'setToken':
      axios.defaults.headers.common['Authorization'] = `Bearer ${mutation.payload}`;
      localStorage.setItem("token", mutation.payload);
      break;
    case 'logout':
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      break;
  }
})

export default store;