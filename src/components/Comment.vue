<template>
  <div class="Comment" id="Comment">
    <div class="label-wrapper" @click="toggleChildren">
      <div :style="indent" :class="labelClasses">
        <p v-if="nodes"></p>
        {{ message }}
      </div>
    </div>
    <Comment 
        v-bind:key="node.id"
        
        v-for="node in nodes"
        :nodes="node.nodes" 
        :message="node.message"
        :depth="depth + 1"   
    >
    </Comment>
  </div>  
</template>

<script>
export default {
  name: "Comment",
  props: [ 'nodes', 'message', 'depth' ],
   data() {
     return {
       showChildren: false
     }
  },
  computed: {
    labelClasses() {
      return { 'has-children': this.nodes }
    },
    indent() {
      return { transform: `translate(${this.depth * 35}px)`,
               width: 600 - (this.depth * 35) + "px"
      }
    }
  },
  methods: {
    toggleChildren() {
       this.showChildren = !this.showChildren;
       console.log(this.showChildren);
    }
  }
};
</script>

<style scoped>
.Comment .label-wrapper div {
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: azure;
  text-align: start;
}

.post.box {
  background-color: azure;
}

.Comment .label-wrapper {
    border-bottom: 1px solid #ccc;
}

.Comment .label-wrapper .has-children {
    cursor: pointer;
}


</style>