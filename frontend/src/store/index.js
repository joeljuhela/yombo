import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    state() {
        return {
            user: null,
            token: null,
            hatIndex: 0
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setToken(state, token) {
            state.token = token
        },
        setHatIndex(state) {
            state.hatIndex = (state.hatIndex + 1) % 5
        }
    },
    getters: {
        isLoggedIn(state) {
            return !!state.token
        }
    },
    plugins: [createPersistedState()]
})