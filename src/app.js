require('expose?$!expose?jQuery!jquery');
require("bootstrap-webpack");

import Vue from 'vue/dist/vue.js'
import Login from './login.vue'
import User from './user.vue'
import Dash from './dash.vue'
import App from './app.vue'
import Company from './company.vue'
import Shipment from './shipment.vue'
import Blockchain from './blockchain.vue'
import VueRouter from 'vue-router'

Vue.component('login', Login)

Vue.use(VueRouter)

App.router = new VueRouter({
    base: __dirname,
    routes: [
        {path: '/', component: Dash},
        {path: '/shipment', component: Shipment},
        {path: '/user', component: User},
        {path: '/company', component: Company},
        {path: '/blockchain', component: Blockchain}
    ]
})

new Vue(App).$mount('#app')