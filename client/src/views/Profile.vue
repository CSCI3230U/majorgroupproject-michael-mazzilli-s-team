<template>
<div class="tile is-ancestor">
  <div class="tile is-4 is-vertical is-parent">
    <div class="tile is-child box">
      <ProfileInfo :user="user"/>
    </div>
  </div>
  <div class="tile is-parent">
    <div class="tile is-child">
      <Post v-for="post in posts" :key="post.poster_id" :post="post" :user="user"/>
    </div>
  </div>
</div>
</template>

<script>
import Post from '@/components/Post.vue'
import ProfileInfo from '@/components/ProfileInfo.vue'

export default {
  name: "Profile",
  components: {
    Post,
    ProfileInfo,
  },
  data: function () {
      return {
        user: {
          firstName: '',
          lastName: '',
          username: '',
          picture: '',
        },
        posts: []/*{
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?',
          datetime: new Date('2021-04-17T00:35:30'),
        },*/
      }
    },
    methods: {
      getUser() {
        //load the logged in user from cookies
        var user_data = document.cookie;
        user_data = user_data.split('=')[1]
        user_data = JSON.parse(user_data);

        fetch(this.$server+'/getpost/user/'+user_data.msg.uid)
          .then(response => response.json())
          .then(response => {
            console.log(response);
            this.posts = response;
          });

        this.user.firstName = user_data.msg.name.first;
        this.user.lastName = user_data.msg.name.last;
        this.user.username = user_data.msg.username;
        this.user.picture = user_data.msg.picture;
      }
    },
    created() {
      this.getUser();
    }
};
</script>

<style scoped>

</style>