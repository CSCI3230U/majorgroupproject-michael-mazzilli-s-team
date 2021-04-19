<template>
    <div class="chat-window">
        <div class="chats tile is-child">
            <ChatMessage :message="chatLog.message1"/>
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
        </div>
    </div>
</template>

<script>
import ChatMessage from '@/components/ChatMessage.vue';

export default {
  name: "ChatWindow",
  components: {
      ChatMessage,
  },
  props: {
      chatLog: Object,
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