import Vue from 'vue'
import store from "@/store";

import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)
Vue.use(ElementUI);


Vue.config.productionTip = false


// restore login info from localstorage
store.dispatch('auth/RESTORE_AUTH')
new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
