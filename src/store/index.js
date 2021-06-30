import Vuex from 'vuex'
import Vue from "vue";
import moduleAuth from "@/store/auth";
import moduleHome from "@/store/home";
Vue.use(Vuex)


const store = new Vuex.Store({
    modules:{
        auth: moduleAuth,
        home: moduleHome
    }
})

export default store;