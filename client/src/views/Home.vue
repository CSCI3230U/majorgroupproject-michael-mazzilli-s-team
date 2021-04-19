<template lang="pug">
.home
  //img(alt="Vue logo" src="../assets/logo.png")
  Feed(msg="Welcome to Your Vue.js App")

</template>

<script>
// @ is an alias to /src
import Feed from '@/components/Feed.vue'
import Navbar from '@/components/Navbar.vue'
export default {
  name: 'Home',
  components: {
    Feed,
    Navbar
  },
  methods: {
  }
};
</script>