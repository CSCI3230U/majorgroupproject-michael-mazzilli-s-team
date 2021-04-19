<template>
<div class="tile is-ancestor">
  <div class="tile is-3 is-vertical is-parent">
    <div class="chats tile is-child box">
      <Chats :message="chatLog.message2"/>
      <Chats :message="chatLog.message1"/>
      <Chats :message="chatLog.message1"/>
      <Chats :message="chatLog.message2"/>
      <Chats :message="chatLog.message2"/>
      <Chats :message="chatLog.message1"/>
      <Chats :message="chatLog.message2"/>
      <Chats :message="chatLog.message2"/>
    </div>
  </div>
  <div class="tile is-parent">
    <div class="tile is-child box">
      <ChatWindow :chatLog= "chatLog"/>
    </div>
  </div>
</div>
</template>

<script>
import ChatWindow from '@/components/ChatWindow.vue';
import Chats from '@/components/Chats.vue';

export default {
  name: "Messages",
  components: {
    ChatWindow,
    Chats,
  },
  data: function() {
    return {
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
      }
    }
  }
};
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