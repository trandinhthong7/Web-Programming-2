import Vue from 'vue'
import App from './App.vue';
import router from './router';
import VueFlashMessage from 'vue-flash-message';

import 'semantic-ui-css/semantic.min.css';
Vue.use(VueFlashMessage);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)},
).$mount('#app');
