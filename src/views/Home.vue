<template>
  <div class="home">
    <h1 class="home__header">MD Editor</h1>

    <file-list-item
      v-for="item in files"
      :key="item.name"
      :item="item"
      @click.native="edit(item)"
    ></file-list-item>
  </div>
</template>

<script>
// @ is an alias to /src
import FileListItem from "@/components/FileListItem.vue";

export default {
  name: "home",
  components: {
    FileListItem
  },

  methods: {
    edit({ name }) {
      this.$router.push({ name: "edit", params: { slug: name } });
    }
  },

  data() {
    return {
      files: [
        { name: "First-Page-2020-01-29-Beijing.md" },
        { name: "Second-Page-2020-01-29-Beijing.md" },
        { name: "Third-Page-2020-01-29-Beijing.md" }
      ]
    };
  }
};
</script>

<style lang="scss">
.home {
  &__header {
    box-sizing: border-box;
    text-align: center;
    background-color: #2c3e50;
    color: white;
    margin: 0;
    padding: 16px;
    height: 64px;
  }
}
</style>
