<template>
    <div class="chats tile is-child">
    <div class="wrapper">
        <img :src="message.user.picture" width="60px"/>
        <div class="user-name"> 
            <div class="user-name">{{ message.user.firstName }} {{ message.user.lastName }}</div>
        </div>
        <span class="message-text">{{ message.text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Chats",
  props: {
      message: Object,
  },
};
</script>

<style scoped>
img {
  border-radius: 50%;
}

.chats {
    overflow: -moz-hidden-unscrollable;
    scrollbar-width: none;
}

.wrapper {
    display: grid;
    grid-template-columns: 20% 80%;
    grid-template-rows: 20% 80%;
    padding-top: 0.5em;
    padding-left: 0.5em;
    padding-top: 1.5em;
    border-bottom: 1px solid azure;
}

.wrapper:hover {
    background-color: azure;
}

.user-name {
    font-weight: bold;
    justify-self: start;
}

.message-text {
    grid-row: 2;
    grid-column: 2;
    text-align: start;
    padding-top: 6px;
    padding-left: 1px;
    width: 75%; 
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis; 
}
</style>