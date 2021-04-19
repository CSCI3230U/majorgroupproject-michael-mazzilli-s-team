<template>
  <div class="content">
        <div class="wrapper">
          <img :src="comment.user.picture" width="30px"/>
          <div class="comment">{{ comment.message }}</div>
        </div>
  </div>  
</template>

<script>
export default {
  name: "Comment",
  props: {
    comment: Object,
  },
   data() {
     return {
       showChildren: false
     }
  },
};
</script>

<style scoped>
.content {
  padding-left: 1.5em;
  background-color: azure;
}

.comment {
  text-align: start;
  font-size: 0.95em;
  padding-left: 1em;
}

img {
  border-radius: 50%;
}

.wrapper {
  display: flex;
}

</style>