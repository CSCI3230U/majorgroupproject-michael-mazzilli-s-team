<template lang="pug">
.home
  img(alt="Vue logo" src="../assets/logo.png")
  HelloWorld(msg="Welcome to Your Vue.js App")

  // check that the sdk client is not currently loading before accessing its methods
  div(v-if="!$auth.loading")
    //show login when not authenticated
    button(v-if="!$auth.isAuthenticated" @click="login") Log in
    //show logout when authenticated
    button(v-if="$auth.isAuthenticated" @click="logout") Log Out
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    Navbar
  },

  methods: {
    //Log the user in
    login() {
      console.log("login button clicked");
      this.$auth.loginWithRedirect();
    },

    //log the user out
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>
