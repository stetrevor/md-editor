<template>
  <div class="home">
    <h1 class="home__header">MD Editor</h1>

    <div class="home__files">
      <file-list-item
        v-for="item in files"
        :key="item.name"
        :item="item"
        @click.native="edit(item)"
      ></file-list-item>
    </div>

    <div class="home__add-article" @click="write">Write</div>
  </div>
</template>

<script>
// @ is an alias to /src
import FileListItem from "@/components/FileListItem.vue";

import { mapState, mapActions } from "vuex";

export default {
  name: "home",
  components: {
    FileListItem
  },

  beforeRouteEnter(to, from, next) {
    next(vm => vm.getAllFiles());
  },

  computed: mapState({
    files: state => state.files.sort((a, b) => b.updated - a.updated),
    newFile: state => state.newFile
  }),

  methods: {
    ...mapActions(["getAllFiles", "addFile"]),

    edit(file) {
      this.$router.push({ name: "edit", params: { id: file.id } });
    },

    async write() {
      await this.addFile();
      this.edit(this.newFile);
    }
  }
};
</script>

<style lang="scss">
.home {
  display: flex;
  flex-direction: column;

  &__header {
    box-sizing: border-box;
    text-align: center;
    background-color: #2c3e50;
    color: white;
    margin: 0;
    padding: 16px;
    height: 64px;
  }

  &__files {
    flex-grow: 1;
    flex-basis: calc(100vh - 64px - 48px);
  }

  &__add-article {
    box-sizing: border-box;
    text-align: center;
    background-color: #2c3e50;
    color: white;
    margin: 0;
    padding: 16px;
    height: 48px;
    cursor: pointer;
    user-select: none;
  }
}
</style>
