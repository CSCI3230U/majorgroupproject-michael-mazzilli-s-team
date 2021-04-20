<template>
<div class="tile is-ancestor">
  <div class="tile is-4 is-vertical is-parent">
    <div class="tile is-child box">
      <ProfileInfo :user="user"/>
      <div class="menu">
        <ul class="menu-list">
          <li><a v-on:click="selected='posts'; getPosts()"
                  v-bind:class="(isSelected('posts'))?'has-background-light':''">
                  Posts
              </a>
          </li>
          <li><a v-on:click="selected='comments'; getPosts()"
                  v-bind:class="(isSelected('comments'))?'has-background-light':''">
                  Comments
              </a>
          </li>
          <li >
            <a v-if="this.isAuthorized()" v-on:click="selected='settings'"
                v-bind:class="(isSelected('settings'))?'has-background-light':''">
                Settings
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="tile is-parent is-vertical">
    <div id="posts" v-if="isSelected('posts')" class="tile is-child">
      <div class="post" v-for="post in posts" :key="post.post_id" :post="post">
        <Post :post="post"/>
      </div>
    </div>
    <div id="comments" v-if="isSelected('comments')" class="tile is-child">
       <div class="post" v-for="post in posts" :key="post.post_id" :post="post">
        <Post :post="post"/>
      </div>
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
var cookie = require('../scripts/cookies');
var auth = require('../scripts/auth');

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
            this.getPosts();

          });
      },

      getPosts(){
        var dest;
        if(this.selected == 'posts'){
          dest = 'post';
        }else{
          dest = 'comments'
        }
        console.log(dest);

        fetch(this.$server+'/get'+dest+'/user/'+this.user._id)
          .then(response => response.json())
          .then(response => {
            console.log(response);
            if(Object.entries(response).length != 0){
              this.posts = response;
            }
        });
      },

      isAuthorized(){
        var view_id = this.user._id;
        if(auth.isAuthenticated() && JSON.parse(cookie.getCookie('user')).msg._id === view_id){
          console.log(true);
          return true;
        }else{
          console.log("statement is false");
          return false;
        }
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
.post {
  margin-bottom: 1.5rem;
}
</style>