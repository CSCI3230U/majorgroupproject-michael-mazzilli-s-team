<template>
      <div id="new-post" class="tile is-child">
        <form @submit.prevent="submit">
          <div class="field is-grouped">
            <div class="control is-expanded">
              <input
                class="input"
                placeholder="Share your message"
                v-model="contents"
              >
            </div>
            <div class="control">
              <Button/>
            </div>
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
    submit() {
      var data = {
        contents: this.contents,
        token: JSON.parse(cookie.getCookie('user')).token
      }
      console.log(JSON.stringify(data));
      if(data.token !== undefined){
        fetch(this.$server+"/submitpost", {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then(response => response.json())
          .then(response => {
            console.log(response);
        })
      }else{
        this.$router.push('/login');
      }


    }
  }
};
</script>