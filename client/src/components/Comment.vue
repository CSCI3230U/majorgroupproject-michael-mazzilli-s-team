<template>
  <div class="content">
        <div class="comment-wrapper">
          <img :src="comment.author.picture" width="30px"/>
          <div class="comment">{{ comment.contents }}</div>
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

.comment-wrapper {
  display: flex;
  align-items: center;
  margin: 0;
}

</style>