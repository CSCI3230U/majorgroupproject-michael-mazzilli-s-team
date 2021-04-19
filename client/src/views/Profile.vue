<template>
<div class="tile is-ancestor">
  <div class="tile is-4 is-vertical is-parent">
    <div class="tile is-child box">
      <ProfileInfo :user="user"/>
    </div>
  </div>
  <div class="tile is-parent">
    <div class="tile is-child">
      <Post v-for="post in posts" :key="post.post_id" :post="post"/>
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
        //get the user data
        var uid = this.$route.params.uid;
        var user_data;

        fetch(this.$server+"/getuser/"+uid)
          .then(response => response.json())
          .then(response => {
            user_data = response;
          }).then(() => {
            this.user.firstName = user_data.name.first;
            this.user.lastName = user_data.name.last;
            this.user.username = user_data.username;
            this.user.picture = user_data.picture;

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


      }
    },
    created() {
      this.getUser();
    }
};
</script>

<style scoped>

</style>