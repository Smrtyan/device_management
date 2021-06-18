import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)
Vue.use(ElementUI);


Vue.config.productionTip = false

import store from "@/store";

// restore login info from localstorage
store.dispatch('RESTORE_AUTH')
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
