import Vue from 'vue'
import App from './App.vue'
import AsyncComputed from 'vue-async-computed'
import router from './router'

//import Auth0 configuration
import { domain, clientId } from "../auth_config.json";

//import Auth0Plugin
import { Auth0Plugin } from "./auth";

// Install plugins
Vue.use(AsyncComputed);
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
    );
  }
})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
