<template>
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
</template>

<script>
export default {
  name: "Post",

};
</script>

<style scoped>

.post blockquote {
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: azure;
}

.post.box {
  background-color: azure;
}
</style>