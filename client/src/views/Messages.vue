<template>
<div class="tile is-ancestor">
  <div class="tile is-4 is-vertical is-parent">
    <div class="chats tile is-child box">
      <Chats id="msg" @click.native="setActiveFriend(msg)" v-for="msg in friends" :key="msg" :message="msg"/>
      <!-- <ChatMessage v-for="msg in saved_messages" :key="msg" :message="msg"/> -->
    </div>
  </div>
  <div class="tile is-parent">
    <div class="tile is-child box">
      <ChatWindow/>
    </div>
  </div>
</div>
</template>

<script>
import ChatWindow from '@/components/ChatWindow.vue';
import Chats from '@/components/Chats.vue';
var cookies = require('../scripts/cookies');
var currentUser = JSON.parse(cookies.getCookie("user"));

export default {
  name: "Messages",
  components: {
    ChatWindow,
    Chats,
  },

  data: function() {
    return {
      friends: [],
    }
  },

  methods: {
    setActiveFriend: function(event) {
      this.$socket.emit("setActiveFriend", event.user.username)
      this.$socket.emit('getMessages', currentUser.msg.username, event.user.username);
    },
  },
  sockets: {
    getFriends: function (friends) {
        this.friends = []

        for (let i = 0; i < friends.length; i++) {
          this.$socket.emit("getLastMessage", currentUser.msg.username, friends[i].username)
        }
    },
    getLastMessage: function(friend, message) {
      if (message == null) {
        this.friends.push(createMessage(friend, "<No Messages>"))
      } else {
        this.friends.push(message)
      }
    },
  },
};

function createMessage(u, text){
  u = u[0]
  return {
    user: {
      firstName: u.name.first,
      lastName: u.name.last,
      username: u.username,
      picture: u.picture,
    },
    text: text,
    datetime: Date.now()
  }
}

</script>

<style scoped>
.chats {
    position: relative;
    overflow-y: scroll;
    max-height: 90vh;
}

/* width */
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f100; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #f1f1f100; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: azure;
}
</style>