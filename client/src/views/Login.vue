<template>
<div>
    <div class="hero">
        <div class="hero-body is-info">
            <p class="title">Log in...</p>
            <p class="subtitle">...or create a new account</p>
        </div>
    </div>
    <div class="container">
        <form @submit.prevent="submit">
            <div class="field">
                <input class="input" type="text" v-model="username" placeholder="Username"> 
            </div>
            <div class="field">
                <input class="input" type="password" v-model="password" placeholder="Password"> 
            </div>
            <div class="field">
                <p class="control">
                    <button class="button">Login</button>
                </p>
            </div>
        </form>
    </div>
</div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
    setup() {
        
    },

    data() {
        return {
            username: '',
            password: ''
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
                if(Array.isArray(response)){                        
                    console.log("error logging in");
                }else{
                    var cvalue = JSON.stringify(response);
                    var cname = "user";
                    var d = new Date();
                    var expiry = d.setTime(d.getTime() + response.expiresIn).toString();
                    document.cookie=cname+'='+cvalue+'; expires='+expiry;

                    this.$router.push('/');
                }
            });
        }
    }
})
</script>

<style scoped>

</style>
