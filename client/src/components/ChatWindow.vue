<template>
    <div class="chat-window">
        <div id="chat-messages" class="chats tile is-child">
            <ChatMessage :message="chatLog.message2"/>
            <ChatMessage :message="chatLog.message2"/>
            <ChatMessage :message="chatLog.message1"/>
            <ChatMessage :message="chatLog.message2"/>
            <ChatMessage :message="chatLog.message1"/>
            <ChatMessage :message="chatLog.message2"/>
            <ChatMessage :message="chatLog.message1"/>
            <ChatMessage :message="chatLog.message2"/>
            <ChatMessage :message="chatLog.message1"/>
            <ChatMessage :message="chatLog.message2"/>
        </div>
        <div class="tile is-parent">
                <input class="input is-rounded" type="text" placeholder="Type a message">
                <button id="sendBtn" class="is-rounded" v-on:click="sendMessage">Send</button>
        </div>
    </div>
</template>

<script>
import ChatMessage from '@/components/ChatMessage.vue';
var cookies = require('../scripts/cookies');

export default {
  name: "ChatWindow",
  // Store a list of the chat messages
  components: {
      ChatMessage,
  },
  props: {
      chatLog: Object,
  },
  methods: {
    // Called when the user clicks the send button
    sendMessage: function() {
      console.log("Send!")
      var currentUser = cookies.getCookie("user");
      this.$socket.emit('sendMessage', JSON.parse(currentUser).msg.username, "user2", "test")
    }
  },
  sockets: {
    connect: function () {
        console.log('socket connected')
    },
    customEmit: function () {
        console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
    },
    
},
};

</script>

<style scoped>
.chats {
    position: relative;
    overflow-y: scroll;
    max-height: 76vh;
    padding-right: 2em;
}

.response {
    position: absolute;
    width: 100%;
    bottom: 0px;
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