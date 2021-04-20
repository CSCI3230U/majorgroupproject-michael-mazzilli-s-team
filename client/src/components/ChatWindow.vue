<template>
    <div class="chat-window">
        <div id="chat-messages" class="chats tile is-child">
            <ChatMessage v-for="msg in saved_messages" :key="msg" :message="msg"/>
        </div>

        <div class="response tile is-parent">
                <input v-model="input_msg" class="input is-rounded" type="text" placeholder="Type a message">
                <button id="sendBtn" class="is-rounded" v-on:click="sendMessage"><img src="../assets/send.png" width="30px" alt="Send"/></button>

        </div>
    </div>
</template>

<script>
import ChatMessage from '@/components/ChatMessage.vue';
var cookies = require('../scripts/cookies');

export default {
  name: "ChatWindow",
  data: function(){
    return {
      saved_messages : [],
      input_msg: ""
    }
  },

  created() {
        // Get our messages on page load
        var currentUser = JSON.parse(cookies.getCookie("user"));
        this.$socket.emit('getMessages', currentUser.msg.username, currentUser.msg.username);
        this.$socket.emit('getFriends');
  },

  components: {
      ChatMessage,
  },
  props: {
      chatLog: Object,
  },
  methods: {
    // Called when the user clicks the send button
    sendMessage: function() {
      var currentUser = JSON.parse(cookies.getCookie("user"));
      var message = createMessage(currentUser, this.input_msg)
      this.input_msg = ""
      this.$socket.emit('sendMessage', currentUser.msg.username, currentUser.msg.username, message )
    }
  },
  sockets: {
    // Called when we receive messages from the server; save them to the object so they get displayed automatically
    receiveMessages: function (messages) {
        this.saved_messages = messages
    },
    connect: function () {
        // Get our messages on page load
        var currentUser = JSON.parse(cookies.getCookie("user"));
        this.$socket.emit('getMessages', currentUser.msg.username, currentUser.msg.username);
    },
  },
};


function createMessage(currentUser, text){
  return {
    user: {
      firstName: currentUser.msg.name.first,
      lastName: currentUser.msg.name.last,
      username: currentUser.msg.username,
      picture: currentUser.msg.picture,
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
    height: 76vh;
    max-height: 76vh;
    padding-right: 2em;
}

.response {
    position: relative;
    width: 100%;
    bottom: 0px;
}

button {
    border: none;
    background-color: white;
    cursor: pointer;
    padding-top: 3px;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>