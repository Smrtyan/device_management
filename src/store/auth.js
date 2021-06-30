import {login} from "@/api/auth";
const [AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR] = ['AUTH_REQUEST', 'AUTH_SUCCESS', 'AUTH_ERROR']
import request from '@/utils/request'
const state = {
    status:null,
    username: null,
    request
}
const getters = {
    isAuthenticated: state => !!state.username,
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
                    commit('AUTH_SUCCESS',user.username)

                }

                console.log(r);
                resolve(r)
            }).catch((r)=>{
                localStorage.removeItem('username')
                console.log("error")
                console.log(r);

                reject(r)
            })

        })
    },
    ['RESTORE_AUTH']: ({commit})=>{
        const username = localStorage.getItem("username")
        commit('AUTH_SUCCESS',username)
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
    [AUTH_SUCCESS]: (state, username) => {
        state.status = 'success'
        state.username = username
    },
    [AUTH_ERROR]: (state) => {
        state.status = 'error'
    },
    ['AUTH_LOGOUT']:(state) =>{
        state.username = null
        state.status = null
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