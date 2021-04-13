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
          <div class="post tile is-child box">
            <div class="content">
              <p>
                A potential post layout. Obviously needs to be dynamically
                generated at some point, but its a start. Probably want to add
                authors and whatnot as well
              </p>
              <blockquote>
                <p>Example of a first layer comment</p>
                <blockquote class="post">
                  <p>
                    Second layer comment. Should probably set a max depth to
                    display
                  </p>
                </blockquote>
              </blockquote>
              <blockquote>Another first layer comment</blockquote>
            </div>
          </div>

          <div class="post tile is-child box">
            <div class="content">
              <p>
                A potential post layout. Obviously needs to be dynamically
                generated at some point, but its a start. Probably want to add
                authors and whatnot as well
              </p>
              <blockquote>
                <p>Example of a first layer comment</p>
                <blockquote class="post">
                  <p>
                    Second layer comment. Should probably set a max depth to
                    display
                  </p>
                </blockquote>
              </blockquote>
              <blockquote>Another first layer comment</blockquote>
            </div>
          </div>
        </div>
        <MessageBox/>
      </div>
    </body>
  </html>
</template>

<script>
import MessageBox from './MessageBox.vue'

export default {
  name: "Feed",
  props: {
    msg: String,
  },
  components: {
    MessageBox,
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
