// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Axios from 'axios'
import enableInlineVideo from 'iphone-inline-video'

// var enableInlineVideo = require('iphone-inline-video');
import AlloyFinger from 'alloyfinger'
// import Store  from './vuex/store'


Vue.use(VueResource);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // Store,
  template: '<App/>',
  components: { App }
})
