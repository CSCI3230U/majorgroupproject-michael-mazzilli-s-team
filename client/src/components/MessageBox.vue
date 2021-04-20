<template>
      <div id="new-post" class="tile is-child">
        <form @submit.prevent="submit">
          <div class="control is-expanded">
            <textarea
              class="textarea"
              placeholder="Share your message"
              v-model="contents"
            />
          </div>
          <div class="control button-wrapper">
            <Button/>
          </div>
        </form>
      </div>
</template>

<script>
import Button from './Button';
var cookie = require('../scripts/cookies');

export default {
  name: "MessageBox",
  components: {
      Button
  },

  data() {
    return {
      contents: '',
    };
  },

  methods: {
    //Sends form data to server, creates new post
    submit() {
      //get parameters
      var data = {
        contents: this.contents,
        token: JSON.parse(cookie.getCookie('user')).token
      }

      //make sure user is logged in
      if(data.token !== undefined){
        //send data to server
        fetch(this.$server+"/submitpost", {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then(response => response.json())
          .then(() => {
            this.contents = '';
            fetch(this.$server+'/getpost')
              .then(response => response.json())
              .then(response => {
                this.$parent.posts = response;
              });
        });
      }else{
        //go to login page if user isn't logged in.
        this.$router.push('/login');
      }
    }
  }
};
</script>

<style scoped>
.button-wrapper {
  margin-top: 0.5rem;
  margin-right: 1.2rem;
  display: flex;
  justify-content: flex-end;
}
</style>