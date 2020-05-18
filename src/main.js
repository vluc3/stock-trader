import Vue from 'vue';
import App from './App.vue';

import Router from 'vue-router';
import Resource from 'vue-resource';

import { routes } from './routes';

Vue.use(Router);
Vue.use(Resource);

Vue.http.options.root = 'https://stock-trader-vue-js.firebaseio.com/';

Vue.filter('currency', (value) => {
  return (value != null) ? value.toLocaleString() + ' €' : null;
});

const router = new Router({
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
