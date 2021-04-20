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
        <!-- center column -->
        <div id="posts" class="tile is-parent is-vertical is-7 box">
          <!-- Potential post layout -->
          <MessageBox/>
          <Post v-for="post in posts" :key="post._id" :post="post"/> 
        </div>
        <!-- Sidebar for additional content. Maybe put a graph here for site activity? -->
        <div v-if="show" id="right-sidebar" class="tile is-5 is-parent box" @click="toggleChat">
          <ChatWindow :chatLog= "chatLog"/>
        </div>
        <div v-if="!show" id="right-sidebar" class="chats tile is-5 is-vertical is-parent box" @click="toggleChat">
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
          text: "This is a test message. Padding out the text to see how it overflows. This is a test message. Padding out the text to see how it overflows. This is a test message. Padding out the text to see how it overflows.",
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
}

#posts {
    overflow-y: scroll;
    max-height: 85vh;
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
</style>
