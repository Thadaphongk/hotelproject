
import Vue from 'vue'
import App from './App'
import router from './router'
import { sync } from 'vuex-router-sync'
import store from './store'
import VueResource from 'vue-resource'
import BackHeader from './components/Header.vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue)

Vue.use(IconsPlugin)

Vue.component('back-header',BackHeader) 

Vue.config.productionTip = false


Vue.use(VueResource)
sync(store, router)



new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
