import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api/index'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';

Vue.prototype.$api = api;

Vue.config.productionTip = false

Vue.use(Antd);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
