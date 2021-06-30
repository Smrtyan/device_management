import {login} from "@/api/auth";
const [AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR] = ['AUTH_REQUEST', 'AUTH_SUCCESS', 'AUTH_ERROR']
import request from '@/utils/request'
const state = {
    status:null
}
const getters = {
    isAuthenticated: () => localStorage.getItem("tKey")!=null,
    authStatus: state => state.status,
}
const actions = {
    [AUTH_REQUEST]: ({commit}, user) => {
        return new Promise((resolve, reject) => {
            commit('AUTH_REQUEST')


            login({
                ...user,
                remember: false
            }).then(r=>{
                if(r.data.code ==200){
                    commit('AUTH_SUCCESS',{key:r.data.data.tokenName, value:r.data.data.tokenValue})
                }
                resolve(r)
            }).catch((r)=>{
                commit('AUTH_LOGOUT')
                reject(r)
            })

        })
    },
    ['RESTORE_AUTH']: ({commit})=>{
        const key = localStorage.getItem("tKey")
        const value = localStorage.getItem("tValue")
        commit('AUTH_SUCCESS',{key,value})
    },
    ['AUTH_LOGOUT']: ({commit, }) => {
        return new Promise((resolve) => {
            commit('AUTH_LOGOUT')
            localStorage.removeItem('username')
            resolve()
        })
    }
}
const mutations = {
    [AUTH_REQUEST]: (state) => {
        state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, payload) => {
        state.status = 'success'
        const {key,value} = payload
        localStorage.setItem('tKey',key)
        localStorage.setItem('tValue',value)
        request.defaults.headers.common[key] = value

    },
    [AUTH_ERROR]: (state) => {
        state.status = 'error'
    },
    ['AUTH_LOGOUT']:(state) =>{
        state.status = null
        const key = localStorage.getItem('tKey')
        delete request.defaults.headers.common[key]
        localStorage.removeItem('tKey')
        localStorage.removeItem('tValue')
    }
}
const moduleAuth = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
export default moduleAuth