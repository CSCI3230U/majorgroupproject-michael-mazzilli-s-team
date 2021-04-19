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
    max-height: 77vh;
    padding-right: 2em;
}

.response {
    position: absolute;
    width: 100%;
    bottom: 0px;
}
</style>