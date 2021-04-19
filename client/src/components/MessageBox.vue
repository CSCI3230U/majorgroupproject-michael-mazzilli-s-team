<template>
  <div id="right-sidebar" class="tile is-3 is-parent">
      <div id="new-post" class="tile is-child">
        <form @submit.prevent="submit">
          <div class="field">
            <div class="control">
              <textarea
                class="textarea has-fixed-size"
                placeholder="Share your message"
                v-model="contents"
              ></textarea>
            </div>
          </div>
          <div class="control">
            <Button/>
          </div>
          </form>
        </div>
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