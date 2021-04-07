<template lang="pug">
div(class="navbar" role="navigation" aria-label="main navigation")
    // site logo
    .navbar-brand
        img(src="../assets/logo.png" width="50" height="50")
    
    .navbar-menu
        .navbar-start
            router-link(class="navbar-item" to="/") Home
            router-link(class="navbar-item" to="/about") About
        .navbar-end
            div(class="navbar-item" v-if="!$auth.loading")
                div(class="navbar-item has-dropdown is-hoverable" v-if="$auth.isAuthenticated")
                    img(class="profile" :src="$auth.user.picture" alt="profile")

                    div(class="navbar-dropdown is-right is-boxed")
                        a(class="navbar-item") Settings
                        hr(class="navbar-divider")
                        a(class="navbar-item" @click="logout") Log out

                button(class="button" v-if="!$auth.isAuthenticated" @click="login") Log in
</template>

<style scoped>
    img.profile{
        border-radius: 50%;
        scale: 175%;
        margin-right: 2rem;
    }

    .navbar-dropdown {            
        margin-right: 1rem;
    }
</style>

<script>

export default({
    data: function(){
        return {
            profile_pic: false
        }
    },

    mounted: function() {
        //this.$nextTick(function(){
        //    this.getInfo();
        //    
        //})
    },

    methods: {
        //Log the user in
        login() {
          this.$auth.loginWithRedirect();
        },

        //log the user out
        logout() {
          this.$auth.logout({
            returnTo: window.location.origin
          });
        },
    }
})
</script>
