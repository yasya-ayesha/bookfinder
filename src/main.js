import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';
import store from './store/index';
import Home from '@/components/Home.vue';
import Cart from '@/components/Cart.vue';

import Vuelidate from 'vuelidate';
import VueTheMask from 'vue-the-mask';
import {BootstrapVue} from 'bootstrap-vue';

import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(VueRouter);
Vue.use(VueTheMask);
Vue.use(BootstrapVue);

const routes = [
  { path: '/', component: Home },
  { path: '/cart', component: Cart }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export const eventEmitter = new Vue();

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');