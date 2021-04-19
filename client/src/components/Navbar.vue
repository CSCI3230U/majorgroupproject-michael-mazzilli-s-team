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

            div(class="navbar-item" )
                div(class="navbar-item has-dropdown is-hoverable" :key="key" v-if="has_user")
                    img(class="profile" :src="user.msg.picture" alt="profile")
                    div(class="navbar-dropdown is-right is-boxed")
                        a(class="navbar-item") Settings
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
        var data = cookie.getCookie('user');
        if(data === undefined || data === ""){
            data = '{}'
        }
        this.user = JSON.parse(data);
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
            document.cookie='user={}';
            this.key++;
            //TODO FIND A MUCH BETTER WAY TO DO THIS
            window.location.reload();
            this.$router.push('/');
        }
    }
}
</script>
