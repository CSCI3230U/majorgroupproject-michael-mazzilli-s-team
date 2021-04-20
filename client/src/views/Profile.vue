<template>
<div class="tile is-ancestor">
  <div class="tile is-4 is-vertical is-parent">
    <div class="tile is-child box">
      <ProfileInfo :user="user"/>
      <div class="menu">
        <ul class="menu-list">
          <li><a v-on:click="selected='posts'">Posts</a></li>
          <li><a v-on:click="selected='comments'">Comments</a></li>
          <li><a v-on:click="selected='settings'">Settings</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="tile is-parent is-vertical">
    <div id="posts" v-if="isSelected('posts')" class="tile is-child">
      <Post v-for="post in posts" :key="post.post_id" :post="post"/>
    </div>
    <div id="info" v-if="isSelected('settings')" class="tile is-child">
      <LoginInfo :user="user" :key="user._id"/>
    </div>
  </div>
</div>
</template>

<script>
import Post from '@/components/Post.vue'
import ProfileInfo from '@/components/ProfileInfo.vue'
import LoginInfo from '@/components/LoginInfo.vue'

export default {
  name: "Profile",
  components: {
    Post,
    ProfileInfo,
    LoginInfo
  },
  data: function () {
      return {
        user: {},
        posts: [],
        selected: 'posts'
      }
    },
    methods: {
      getUser() {
        //get the user data
        var uid = this.$route.params.uid;
        var user_data;

        fetch(this.$server+"/getuser/"+uid)
          .then(response => response.json())
          .then(response => {
            user_data = response;
          }).then(() => {
            this.user = user_data;
            console.log(this.user);

            //fetch user's posts
            fetch(this.$server+'/getpost/user/'+user_data._id)
              .then(response => response.json())
              .then(response => {
                console.log(response);
                if(Object.entries(response).length != 0){
                  this.posts = response;
                }
              });
          });
      },

      isSelected(item){
        if(this.selected === item){
          return true;
        }
        return false;
      }
    },
    created() {
      this.getUser();
    }
};
</script>

<style scoped>

</style>