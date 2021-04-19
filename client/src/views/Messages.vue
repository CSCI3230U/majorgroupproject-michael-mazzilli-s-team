<template>
<div class="tile is-ancestor">
  <div class="tile is-4 is-vertical is-parent">
    <div class="tile is-child box">
      Friends
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

export default {
  name: "Messages",
  components: {
    ChatWindow,
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
          datetime: new Date('2021-04-18T15:25:30')
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