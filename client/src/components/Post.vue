<template>
    <div class="post tile is-child box">
        <div class="content">
            <div class="wrapper">
                <img :src="user.picture" width="60px"/>
                <div class="user-name-date"> 
                    <div class="user-name">{{ user.firstName }} {{ user.lastName }}</div>
                    <div class="username">@{{ user.username }}</div>
                    <div class="timeSince"> · {{ timesince }}</div> 
                </div>
                <div class="posttext">{{ post.contents }}</div>
            </div>
            <Comment 
                :nodes="commentTree.nodes" 
                :depth="0"   
                :message="commentTree.message"
            />
        </div>
    </div>
</template>

<script>
import Comment from './Comment';

export default {
  name: "Post",
  components: {
      Comment,
  },
  props: {
      user: Object,
      post: Object,
  },
  data: function() {
        return {
            commentTree: {
            id: 0,
            message: 'Comment number one.',
            nodes: [
                {
                id: 1,
                message: 'Reply to comment number one.',
                nodes: [
                    {
                    id: 2,
                    message: 'Reply to reply to comment number one.'
                    },
                    {
                    message: 'Reply to reply to comment number one (part 2).',
                    nodes: [
                        {
                        id: 3,
                        message: 'Reply to 2nd reply of comment number one.'
                        }
                    ]
                    }
                ]
                }, 
                {
                id: 4,
                message: 'Comment number two.'  
                }
            ]
            },
            timesince: 0
        }
  },
  methods: {
      timeSince () {
          //get the current date, and date posted
          var now = new Date();
          var postDate = Date.parse(this.post.date_contributed);

            //determine time between
          this.timesince = now.getTime() - postDate;
          if (this.timesince >= 31560000000) {
              this.timesince = Math.floor(this.timesince / 1000 / 60 / 60 / 24 / 30 / 12) + 'y';
          } else if (this.timesince >= 2630000000) {
              this.timesince = Math.floor(this.timesince / 1000 / 60 / 60 / 24 / 7) + 'w';
          } else if (this.timesince >= 86400000) {
              this.timesince = Math.floor(this.timesince / 1000 / 60 / 60 / 24) + 'd';
          } else if (this.timesince >= 3600000) {
              this.timesince = Math.floor(this.timesince / 1000 / 60 / 60) + 'h';
          } else if (this.timesince >= 60000) {
              this.timesince = Math.floor(this.timesince / 1000 / 60) + 'm';
          } else {
              this.timesince = Math.floor(this.timesince / 1000) + 's';
          } 
      }
  },
  created() {
      this.timeSince()
  }
};
</script>

<style scoped>

.post blockquote {
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: azure;
}

.post.box {
  background-color: azure;
}

img {
  border-radius: 50%;
  margin-bottom: 1rem;
}

.wrapper {
    display: grid;
    grid-template-columns: 10% 90%;
    grid-template-rows: 20% 80%;
}

.user-name-date {
    justify-self: start;
    padding-left: 1em;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}

.user-name {
    font-weight: bold;
    justify-self: start;
}

.username {
    font-weight: normal;
    justify-self: start;
}

.timeSince {
    justify-self: start;
    padding-left: 0.5em;
}

.posttext {
    grid-row: 2;
    grid-column: 2;
    text-align: start;
    padding-left: 1em;
}

</style>