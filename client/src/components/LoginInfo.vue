<template>
<div>
    <div class="hero">
        <div class="hero-body">
            <p class="title">Change Info</p>
        </div>
    </div>
    <form @submit.prevent="submit">
        <div class="field">
            <input  class="input" 
                    type="text" 
                    v-model="firstname"/>
        </div>
        <div class="field">
            <input  class="input" 
                    type="text" 
                    v-model="lastname"/>
        </div>
        <div class="field">
            <input  class="input" 
                    type="password" 
                    v-model="new_password" 
                    v-bind:class="(match())?'is-normal':'is-danger'"
                    placeholder="Change Password"/>
        </div>
        <div class="field">
            <input  class="input" 
                    type="password" 
                    v-model="verify_password" 
                    v-bind:class="(match())?'is-normal':'is-danger'"
                    placeholder="Verify Password"/>
        </div>
        <div class="field">
            <button class="button is-info">Submit</button>
        </div>
    </form>
</div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
var cookie = require('../scripts/cookies');

export default defineComponent({
    setup() {

    },

    props: {
        user: Object
    },

    data() {
        return{
            firstname: this.user.name.first,
            lastname: this.user.name.last,
            new_password: '',
            verify_password: ''
        }
    },

    methods: {
        submit(){
            if(!this.match()){
                return;
            }

            //get the data
            var data = {
                first:this.firstname,
                last:this.lastname,
                password:this.new_password,
                token: cookie.getToken()
            }
            var user_id = this.user._id;

            console.log(user_id);
            console.log(data);

            //Send request to server
            fetch(this.$server+'/updateuser',{
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
            .then(response => {
                console.log(response);
                if(response.message === 'Success'){
                    console.log("success");
                    this.new_password = '';
                    this.verify_password = '';
                    window.location.reload();
                }
            });

        },

        match(){
            if(this.new_password === this.verify_password){
                console.log("passwords match");
                return true;
            }
            console.log("passwords don't match");
            return false;
        }
    }
})
</script>

<style scoped>
input {
    margin-top: 1rem;
}
</style>
