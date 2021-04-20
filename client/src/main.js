import Vue from 'vue'
import App from './App.vue'
import store from './store/store'
import router from './router'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'


// Connect to the Chat Socket and store a reference in the store
Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('http://localhost:3001'),
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
}))

//Declare global variables
Vue.prototype.$server = "http://localhost:3000";

Vue.config.productionTip = false

document.title = "TweetBook";

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

