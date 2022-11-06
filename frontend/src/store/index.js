import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    state() {
        return {
            user: null,
            token: null
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setToken(state, token) {
            state.token = token
        }
    },
    getters: {
        isLoggedIn(state) {
            return !!state.token
        }
    },
    plugins: [createPersistedState()]
})