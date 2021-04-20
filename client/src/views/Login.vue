<template>
<div>
    <div class="hero">
        <div class="hero-body is-info">
            <p class="title">Log in...</p>
            <p class="subtitle">...or create a <a href="/newaccount">new account</a></p>
        </div>
    </div>
    <div class="container">
        <form @submit.prevent="submit">
            <div class="field">
                <input class="input" v-bind:class = "(invalid)?'is-danger':'is-normal'" type="text" v-model="username" placeholder="Username"> 
            </div>
            <div class="field">
                <input class="input" v-bind:class = "(invalid)?'is-danger':'is-normal'" type="password" v-model="password" placeholder="Password"> 
            </div>
            <div class="field">
                <p class="control"><button class="button">Login</button></p>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
var cookie = require('../scripts/cookies');

export default defineComponent({
    setup() {
        
    },

    data() {
        return {
            username: '',
            password: '',
            invalid: false
        };
    },
    
    methods: {
        submit() {
            //get the form data
            var data = {
                username: this.username,
                password: this.password
            }

            //send the request
            fetch(this.$server+"/login", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then( response => response.json() )
            .then( response => {
                if(Array.isArray(response) || response.message == 'Authentication failed'){                        
                    console.log("error logging in");
                    this.invalid = true;
                    
                }else{
                    cookie.writeCookie('user', JSON.stringify(response), response.expiresIn);

                    //TODO FIND A MUCH BETTER WAY TO DO THIS
                    window.location.reload();
                    this.$router.push('/');
                    
                    // Broadcast to the server the name of UID of the account we logged in to
                    this.$socket.emit("login", response.msg.username)
                }
            });
        }
    }
})
</script>

<style scoped>

</style>
