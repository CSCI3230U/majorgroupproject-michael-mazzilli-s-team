import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        socket: null
    },
    getters: {
        getSocket(state) {
            return state.socket
        }
    },
    mutations: {
        setSocket(state, socket) {
            console.log("set socket")
            state.socket = socket
        },


    },
    actions: {
    
    }
})