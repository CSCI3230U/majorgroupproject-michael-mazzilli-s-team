<template>
<div>
    <div class="hero">
        <div class="hero body">
            <p class="title">Create a New Account</p>
        </div>
    </div>
    <div class="container">
        <form @submit.prevent="submit">
            <div class="field">
                <input  class="input" 
                        v-bind:class="(firstname_invalid)?'is-danger':'is-normal'" 
                        type="text" 
                        v-model="firstname" 
                        placeholder="First Name">
            </div>
             <div class="field">
                <input  class="input" 
                        v-bind:class="(lastname_invalid)?'is-danger':'is-normal'" 
                        type="text" 
                        v-model="lastname" 
                        placeholder="Last Name">
            </div>
            <div class="field">
                <input  class="input" 
                        v-bind:class="(username_invalid)?'is-danger':'is-normal'" 
                        type="text" 
                        v-model="username" 
                        placeholder="Username">
            </div>
            <div class="field">
                <input  class="input" 
                        v-bind:class="(!password_match)?'is-danger':'is-normal'" 
                        type="password" 
                        v-model="password" 
                        placeholder="Password">
            </div>
            <div class="field">
                <input  class="input" 
                        v-bind:class="(!password_match)?'is-danger':'is-normal'" 
                        type="password" 
                        v-model="password_check" 
                        placeholder="Re-enter Password">
            </div>
            <div class="field">
                <p class="control"><button class="button is-info">Login</button></p>
            </div>
        </form>
        <p class="has-text-danger">{{ error_msg }}</p>
    </div>
</div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import Button from '../components/Button';
var cookie = require('../scripts/cookies');

export default defineComponent({
    Name: "NewAccount",
    setup() {
        
    },

    components: {
        Button
    },

    data: function(){
        return {
            username: '',
            password: '',
            password_check: '',
            lastname: '',
            firstname: '',

            password_match: true,
            username_invalid: false,
            firstname_invalid: false,
            lastname_invalid: false,

            error_msg: ''
        };
    },

    methods: {
        submit() {
            //reset field states
            this.password_match = true;
            this.username_invalid = false;
            this.firstname_invalid = false;
            this.lastname_invalid = false;

            //input validation
            if((this.password === '') || (this.password !== this.password_check)){
                this.password_match = false;
            }if(this.username === ''){
                this.username_invalid = true;
            }if(this.firstname === ''){
                this.firstname_invalid = true;
            }if(this.lastname === ''){
                this.lastname_invalid = true;
            }if(this.lastname_invalid || this.firstname_invalid || this.username_invalid){
                this.error_msg = 'Fields required';
                return;
            }if(!this.password_match){
                this.error_msg = 'Passwords do not match';
                return;
            }

            //get the data from the forms
            const data = {
                first: this.firstname,
                last: this.lastname,
                username: this.username,
                password: this.password
            };

            console.log(data);

            //send the request
            fetch(this.$server+"/adduser",{
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
            .then(response => {
                console.log(response.error);
                if(Object.entries(response.error).length == 0){
                    this.login(data);
                }else{
                    this.error_msg = response.error.message;
                }
            });
        },

        login(data){
            fetch(this.$server+'/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({  password: data.password,
                                        username: data.username})
                
            }).then(response => response.json())
            .then(response => {
                cookie.writeCookie('user', JSON.stringify(response), response.expiresIn);
                window.location.reload();
                this.$router.push('/');
            })

        }
    }
})
</script>

<style scoped>

</style>
