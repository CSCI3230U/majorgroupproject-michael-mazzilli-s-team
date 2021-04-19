<template>
<div class="tile is-ancestor">
  <div class="tile is-4 is-vertical is-parent">
    <div class="tile is-child box">
      <ProfileInfo :user="user"/>
    </div>
  </div>
  <div class="tile is-parent">
    <div class="tile is-child">
      <Post :post="post" :user="user"/>
      <Post :post="post" :user="user"/>
      <Post :post="post" :user="user"/>
      <Post :post="post" :user="user"/>
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
          firstName: 'John',
          lastName: 'Doe',
          username: 'john123',
          picture: 'https://randomuser.me/api/portraits/men/11.jpg',
        },
        post: {
          text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo reprehenderit optio amet ab temporibus asperiores quasi cupiditate. Voluptatum ducimus voluptates voluptas?',
          datetime: new Date('2021-04-17T00:35:30'),
        },
      }
    },
    methods: {
      async getUser() {
        const res = await fetch('https://randomuser.me/api')
        const { results } = await res.json()

        this.user.firstName = results[0].name.first
        this.user.lastName = results[0].name.last
        this.user.username = results[0].login.username
        this.user.picture = results[0].picture.large
        console.log(results[0].username);
      }
    },
    created() {
      this.getUser();
    }
};
</script>

<style scoped>

</style>