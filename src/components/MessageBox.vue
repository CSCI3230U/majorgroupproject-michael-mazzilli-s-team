<template>
  <div id="right-sidebar" class="tile is-3 is-parent">
          <div id="new-post" class="tile is-child">
            <div class="field">
              <div class="control">
                <textarea
                  class="textarea has-fixed-size"
                  placeholder="Share your message"
                ></textarea>
              </div>
            </div>
            <div class="control">
              <button class="button is-link">Post</button>
            </div>
          </div>
        </div>
</template>

<script>
export default {
  name: "MessageBox",
};
</script>