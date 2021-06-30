

const state = {
    loading: true,
    groupOperationType: "all"
}
const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
}
const actions = {


    ['AUTH_LOGOUT']: ({commit, }) => {
        return new Promise((resolve) => {
            commit('AUTH_LOGOUT')
            localStorage.removeItem('user-token') // clear your user's token from localstorage
            resolve()
        })
    }
}
const mutations = {
    ['RESTORE_AUTH']: (state) => {
        state.status = 'loading'
    },

}
const moduleHome = {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
export default moduleHome