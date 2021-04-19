<template>
    <div class="post tile is-child box">
        <div class="content">
            <div class="wrapper" @click="toggleComments">
                <img :src="post.author.picture" width="60px"/>
                <div class="user-name-date"> 
                    <div class="user-name">{{ post.author.name.first }} {{ post.author.name.last }}</div>
                    <div class="username">@{{ post.author.username }}</div>
                    <div class="timeSince"> · {{ timesince }}</div> 
                </div>
                <div class="posttext">{{ post.contents }}</div>
            </div>
            <div v-if="!show" class="hidden"></div>
            <div v-if="show" class="comments" :key="post.replies.length" @click="toggleComments">
                <Comment v-for="comment in post.replies" :key="comment._id" :comment="comment"/>
            </div>
            <form @submit.prevent="submit">
                <div class="container reply">
                    <input class=input v-model="contents" type="text" placeholder="Post a repy">
                    <Button>Post</Button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Comment from './Comment';
import Button from './Button';
var cookie = require('../scripts/cookies');

export default {
  name: "Post",
  components: {
      Comment,
      Button,
  },
  props: {
      post: Object,
  },
  data: function() {
        return {
            timesince: 0,
            show: false,
            contents: '',
            reload: 0
        }
  },
  methods: {
      submit () {
        var post_id = this.post._id;
        var data = {
            contents : this.contents,
            token : cookie.getToken()
        }

        //send the request
        fetch(this.$server+"/submitcomment/"+post_id, {
            method:"post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
        .then(response => {
            console.log(response);
            if(response.status === "success"){
                //clear the input 
                this.contents = '';
                
                //update the comments on the post
                fetch(this.$server+"/getcomments/"+post_id)
                    .then(response => response.json())
                    .then(response => {
                        this.post.replies = response;
                })
            }
        })

      },
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
      },
    toggleComments() {
        this.show = !this.show;
        console.log(this.show);
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
    grid-template-rows: 20% 60% 20%;
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
    display: block;
}

.comments {
    border-top: 1px solid rgb(132, 216, 216);
    padding-top: 1em;
}

.hidden {
    border-top: 1px solid rgb(132, 216, 216);
}

.reply {
    margin-top: 1rem;
    display: flex;
}



</style>