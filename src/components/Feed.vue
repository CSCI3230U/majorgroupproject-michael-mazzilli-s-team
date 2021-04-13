<template>
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bulma@0.9.1/css/bulma.min.css"
      />
      <link rel="stylesheet" type="text/css" href="styles/main.css" />

      <meta charset="UTF-8" />
      <title></title>
    </head>
    <body>
      <!-- Using Bulma's tiles to control the layout -->
      <div id="page-content" class="tile is-ancestor">
        <!-- Sidebar for additional content. Maybe put a graph here for site activity? -->
        <div id="left-sidebar" class="tile is-3"></div>

        <!-- center column -->
        <div id="posts" class="tile is-parent is-vertical is-6">
          <!-- Potential post layout -->
          <Post/>
          <Post/>
          <Post/>
          <Post/>          
        </div>
        <MessageBox/>
      </div>
    </body>
  </html>
</template>

<script>
import MessageBox from './MessageBox.vue'
import Post from './Post.vue'

export default {
  name: "Feed",
  props: {
    msg: String,
  },
  components: {
    MessageBox,
    Post,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
nav {
  margin-bottom: 1rem;
}

#page-content {
  margin: 1rem;
}

.post blockquote {
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: azure;
}

.post.box {
  background-color: azure;
}
</style>
