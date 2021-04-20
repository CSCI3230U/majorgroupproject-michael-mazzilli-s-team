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
        .navbar-end
            div(class="navbar-item" )
                div(class="navbar-item has-dropdown is-hoverable" :key="key" v-if="has_user")
                    img(class="profile" :src="user.msg.picture" alt="profile")
                    div(class="navbar-dropdown is-right is-boxed")
                        a(class="navbar-item" href="/profile") Settings
                        hr(class="navbar-divider")
                        a(class="navbar-item" @click="logout") Log out

                div(v-if="!has_user")
                    a(class="button" href="/login") Log in
                    a(class="button" href="/newaccount") Create Account
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

var cookie = require('../scripts/cookies');
var auth = require('../scripts/auth');


export default {
    components: {
        SearchBar,
    },

    created(){
        //get the user object from the token
        var data = cookie.getCookie('user');
        if(data === undefined || data === ""){
            data = '{}'
        }
        this.user = JSON.parse(data);
        this.toggleNavbar();
    },

    data: function(){
        return {
            profile_pic: false,
            user: '',
            key: 0,
        }
    },

    computed: {
        has_user: function(){
            return auth.isAuthenticated();
        }
    },

    methods: {
        logout(){
            console.log('logging out');
            cookie.resetCookie('user');
            this.key++;
            //TODO FIND A MUCH BETTER WAY TO DO THIS
            window.location.reload();
            this.$router.push('/');
        },
        toggleNavbar() {
            document.addEventListener('DOMContentLoaded', () => {

            // Get all "navbar-burger" elements
            const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

            // Check if there are any navbar burgers
            if ($navbarBurgers.length > 0) {

                // Add a click event on each of them
                $navbarBurgers.forEach( el => {
                el.addEventListener('click', () => {

                    // Get the target from the "data-target" attribute
                    const target = el.dataset.target;
                    const $target = document.getElementById(target);

                    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                    el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');

                });
                });
            }
        });
        }
    }
}
</script>
