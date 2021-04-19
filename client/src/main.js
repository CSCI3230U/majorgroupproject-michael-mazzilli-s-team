import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'

//Declare global variables
Vue.prototype.$server = "http://localhost:3000";

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
    debug: true,
    connection: SocketIO('http://localhost:3001'), //options object is Optional
    vuex: {
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_"
    }
  })
);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')