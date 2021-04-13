<template>
    <div class="post tile is-child box">
            <div class="content">
              <p>
                A potential post layout. Obviously needs to be dynamically
                generated at some point, but its a start. Probably want to add
                authors and whatnot as well
              </p>
              <Comment 
                :nodes="commentTree.nodes" 
                :depth="0"   
                :message="commentTree.message"
              />
              <blockquote>Another first layer comment</blockquote>
            </div>
          </div>
</template>

<script>
import Comment from './Comment';

export default {
  name: "Post",
  components: {
      Comment,
  },
  data: function() {
        return {
            commentTree: {
            id: 0,
            message: 'root',
            nodes: [
                {
                id: 1,
                message: 'item1',
                nodes: [
                    {
                    id: 2,
                    message: 'item1.1'
                    },
                    {
                    message: 'item1.2',
                    nodes: [
                        {
                        id: 3,
                        message: 'item1.2.1'
                        }
                    ]
                    }
                ]
                }, 
                {
                id: 4,
                message: 'item2'  
                }
            ]
            }
        }
  },
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