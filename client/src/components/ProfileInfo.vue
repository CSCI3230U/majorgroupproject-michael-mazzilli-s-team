<template>
    <div class="content">
            <div class="wrapper">
                <img :src="user.picture" width="150px"/>
                <div class="user-name-date"> 
                    <div class="user-name">{{ user.name.first }} {{ user.name.last}}</div>
                    <div class="username">@{{ user.username }}</div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
  name: "ProfileInfo",
  props: {
      user: Object,
  },
};
</script>

<style scoped>
img {
  border-radius: 50%;
  margin-bottom: 1rem;
  border: 3px #333 solid;
}

.wrapper {
  display: inline-block;
}
</style>