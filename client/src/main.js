import Vue from 'vue'
import App from './App.vue'
import router from './router'

//Declare global variables
Vue.prototype.$server = "http://localhost:3000";

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
