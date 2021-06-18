import Vuex from 'vuex'
import Vue from "vue";
import axios from "axios";
const [AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR] = ['AUTH_REQUEST', 'AUTH_SUCCESS', 'AUTH_ERROR']
Vue.use(Vuex)

const state = {
    token: null,
    status:null
}
const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
}
const actions = {
    [AUTH_REQUEST]: ({commit}, user) => {
        return new Promise((resolve, reject) => { // The Promise used for router redirect in login
            commit('AUTH_REQUEST')
            axios({url: 'auth', data: user, method: 'POST' })
                .then(resp => {
                    const token = resp.data.token
                    localStorage.setItem('user-token', token) // store the token in localstorage
                    // Add the following line:
                    axios.defaults.headers.common['Authorization'] = token
                    commit('AUTH_SUCCESS', token)
                    // you have your token, now log in your user :)
                    // dispatch('USER_REQUEST')
                    resolve(resp)
                })
                .catch(err => {
                    commit('AUTH_ERROR', err)
                    localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
                    reject(err)
                })
        })
    },
    ['RESTORE_AUTH']: ({commit})=>{
        const token = localStorage.getItem("user-token")
        if (token) {
            axios.defaults.headers.common['Authorization'] = token
        }
        commit('AUTH_SUCCESS',token)
    },
    ['AUTH_LOGOUT']: ({commit, }) => {
        return new Promise((resolve) => {
            commit('AUTH_LOGOUT')
            localStorage.removeItem('user-token') // clear your user's token from localstorage
            // remove the axios default header
            delete axios.defaults.headers.common['Authorization']
            resolve()
        })
    }
}
const mutations = {
    [AUTH_REQUEST]: (state) => {
        state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, token) => {
        state.status = 'success'
        state.token = token
    },
    [AUTH_ERROR]: (state) => {
        state.status = 'error'
    },
    ['AUTH_LOGOUT']:(state) =>{
        state.token = null
        state.status = null
    }
}
const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
export default store;