import Vue from 'vue';
import dotenv from 'dotenv';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

dotenv.config({
  path: __dirname + '/../../.env'
});

import App from './App';
import router from './router.js';
import store from './store';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;
Vue.use(Element, { size: 'small' });

Promise.resolve()
  .then(() => require('./db/init').default())
  .then(() => store.dispatch('authenticate'))
  .then(() => {
    new Vue({
      components: { App },
      router,
      store,
      template: '<App/>'
    }).$mount('#app');
  });
