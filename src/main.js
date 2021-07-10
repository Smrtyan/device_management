import Vue from 'vue'
import store from "@/store";
import VideoPlayer from 'vue-video-player' 
import 'videojs-flash'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuelidate from 'vuelidate'


import 'bootstrap/dist/css/bootstrap.css'
import 'video.js/dist/video-js.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.use(VideoPlayer)


Vue.config.productionTip = false


// restore login info from localstorage
store.dispatch('auth/RESTORE_AUTH')
new Vue({
 
  store,
  router,
  render: h => h(App),
}).$mount('#app')
