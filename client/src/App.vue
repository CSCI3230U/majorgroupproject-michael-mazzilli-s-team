<template lang="pug">
#app
  #nav  
    Navbar
    router-view
</template>

<script>
import Navbar from '@/components/Navbar.vue';
var cookies = require('./scripts/cookies');
var auth = require('./scripts/auth');
var user = cookies.getCookie('user');
if(user === '' || user === undefined){
  user = '{}';
}
var currentUser = JSON.parse(user);

export default {
  components: {
    Navbar
  },
  sockets: {
  connect: function () {
    if(auth.isAuthenticated()){
      console.log('socket connected')
      this.$socket.emit("login", currentUser.msg.username)
    }
  },
  },
}
</script>


<style>
/* import bulma globally */
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
