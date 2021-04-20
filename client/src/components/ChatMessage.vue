<template>
    <div class="wrapper">
        <img :src="message.user.picture" width="50px"/>
        <div class="user-name"> 
            <div class="user-name">{{ message.user.firstName }} {{ message.user.lastName }}</div>
        </div>
        <span class="message-text">{{ message.text }}</span>
    </div>
</template>

<script>
export default {
  name: "ChatMessage",
  props: {
      message: Object,
  },
};
</script>

<style scoped>
img {
  border-radius: 50%;
}

.wrapper {
    display: grid;
    grid-template-columns: 10% 90%;
    grid-template-rows: 20% 80%;
}

.user-name {
    font-weight: normal;
    font-size: 12px;
    justify-self: start;
    padding-left: 0.5em;
}

.message-text {
    grid-row: 2;
    grid-column: 2;
    text-align: start;
    background-color: azure;
    border-radius: 25px;
    padding: 2px;
    padding-left: 1em;
    padding-right: 1em;
    margin-bottom: 1em;
    width: fit-content;
    height: fit-content;
}
</style>