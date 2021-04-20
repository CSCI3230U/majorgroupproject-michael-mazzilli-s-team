<template>
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css"
      />
      <link rel="stylesheet" type="text/css" href="styles/main.css" />

      <meta charset="UTF-8" />
      <title></title>
    </head>
    <body>
      <!-- Using Bulma's tiles to control the layout -->
      <div id="page-content" class="tile is-ancestor">
        <div class="tile is-parent is-3 is-vertical" id="left"></div>

        <!-- swapped out for the is-3 tile when shrinking the window. Otherwise not displaying -->
        <div class="tile is-parent is-2 is-vertical" id="left2"></div>
        <div class="tile is-parent is-1 is-vertical" id="left1"></div>

        <!-- center column -->
        <div id="posts" class="tile is-parent is-vertical is-5 box">
          <!-- Potential post layout -->
          <MessageBox/>
          <Post v-for="post in posts" :key="post._id" :post="post"/> 
        </div>
        <div class="tile is-vertical" id="middle"/>
        <!-- Sidebar for additional content. Maybe put a graph here for site activity? -->
        <div v-if="show" id="right-sidebar" class="tile is-3 is-parent box" @click="toggleChat">
          <ChatWindow :chatLog= "chatLog"/>
        </div>
        <div v-if="!show" id="right-sidebar" class="chats tile is-3 is-vertical is-parent box" @click="toggleChat">
          <div class="tile is-child">
          <Chats :message="chatLog.message2"/>
          <Chats :message="chatLog.message1"/>
          <Chats :message="chatLog.message1"/>
          <Chats :message="chatLog.message2"/>
          <Chats :message="chatLog.message2"/>
          <Chats :message="chatLog.message1"/>
          <Chats :message="chatLog.message2"/>
          <Chats :message="chatLog.message2"/>
          <Chats :message="chatLog.message1"/>
          <Chats :message="chatLog.message2"/>
          <Chats :message="chatLog.message2"/>
          </div>
        </div>
      </div>
    </body>
  </html>
</template>

<script>
import MessageBox from './MessageBox.vue'
import Post from './Post.vue'
import ChatWindow from './ChatWindow.vue'
import Chats from './Chats.vue'

export default {
  name: "Feed",
  props: {
    msg: String,
  },
  components: {
    MessageBox,
    Post,
    ChatWindow,
    Chats,
  },
  data: function () {
      return {
        posts: [],
        chatLog: {
        message1: {
          user: {
            firstName: 'John',
            lastName: 'Doe',
            username: 'john123',
            picture: 'https://randomuser.me/api/portraits/men/11.jpg',
          },
          text: "This is a test message. Padding out the text to see how it overflows. This is a test message. Padding out the text to see how it overflows.",
          datetime: new Date('2021-04-17T15:25:30')
        },
        message2: {
          user: {
            firstName: 'Mary',
            lastName: 'Ann',
            username: 'mAnn123',
            picture: 'https://randomuser.me/api/portraits/women/11.jpg',
          },
          text: "This is a test message. Padding out the text to see how it overflows.",
          datetime: new Date('2021-04-18T15:25:30')
        }
      },
      show: true,
      }
    },
    methods: {
      getPosts() {
        fetch(this.$server+"/getpost")
          .then(response => response.json())
          .then(response => {
            this.posts = response;
        });
      },
      toggleChat() {
        this.show = !this.show;
        console.log(this.show);
      }
    },

    created() {
      this.getPosts();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
nav {
  margin-bottom: 1rem;
  overflow: hidden;
}

body {
  overflow: hidden;
}

#page-content {
  margin-left: 1rem;
  margin-right: 1rem;
  margin-top: 0.5rem;
}

.post blockquote {
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: azure;
}

.post.box {
  background-color: azure;
}

#right-sidebar {
  max-height: 85vh;
  min-width: 300px;
}

#posts {
    overflow-y: scroll;
    max-height: 85vh;
    min-width: 550px;
}

.chats {
    overflow-y: scroll;
    max-height: 85vh;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f100; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: azure;
}

@media screen and (min-width: 1350px) {
  #left1 { display: none; }
  #left2 { display: none; }
}

@media screen and (min-width: 1125px) and (max-width: 1350px) {
  #left { display: none; }
  #left1 { display: none; }
}

@media screen and (min-width: 1035px) and (max-width: 1125px) {
  #left { display: none; }
  #left2 { display: none; }
}

@media screen and (max-width: 1035px) {
  #left { display: none; }
  #left1 { display: none; }
  #left2 { display: none; }
}

@media screen and (max-width: 950px) {
  #page-content {
    margin-left: 0;
    margin-right: 0;
  }
  #posts {
    min-width: 475px;
  }
}

@media screen and (max-width: 850px) {
  #posts {
    min-width: 400px;
  }
}


</style>
