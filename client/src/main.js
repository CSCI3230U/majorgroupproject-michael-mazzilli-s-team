import Vue from 'vue'
import App from './App.vue'
import router from './router'

//Declare global variables
Vue.prototype.$server = "http://localhost:3000";

let currentUser;
Vue.prototype.$setCurrentUser = function(user) {
  currentUser = user;
};

console.log("main.js running");
Vue.prototype.$getCurrentUser = function() {
  console.log(currentUser);
  return currentUser;
};

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
