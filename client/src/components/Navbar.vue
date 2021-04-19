<template lang="pug">
div(class="navbar" role="navigation" aria-label="main navigation")
    // site logo
    .navbar-brand
        a.navbar-item(href='#index.html')
            img(src='../assets/temp.png')
        a.navbar-burger(role='button' aria-label='menu' aria-expanded='false' data-target='navbarBasicExample')
            span(aria-hidden='true')
            span(aria-hidden='true')
            span(aria-hidden='true')
    #navbarBasicExample.navbar-menu
        .navbar-start
            a.navbar-item(href="/")
                | Home
            a.navbar-item(href="/profile")
                | Profile
            a.navbar-item(href="/messages")
                | Messages
            .navbar-item.has-dropdown.is-hoverable
                a.navbar-link
                    | More
                .navbar-dropdown
                    a.navbar-item
                        | About
                    a.navbar-item
                        | Jobs
                    a.navbar-item
                        | Contact
                    hr.navbar-divider
                    a.navbar-item
                        | Report an issue

        .navbar-end
            SearchBar.navbar-item
                | SearchBar
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
    img {
        border-radius: 50%;
        scale: 200%;
        margin-right: 1rem;
    }

    .navbar-dropdown {            
        margin-right: 1rem;
    }
</style>

<script>
import SearchBar from '@/components/SearchBar.vue'

export default {
    components: {
        SearchBar,
    },
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
}
</script>
