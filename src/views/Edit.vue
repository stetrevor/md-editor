<template>
  <div class="edit">
    <div class="edit__header">
      <div class="edit__back edit__button" @click="back">Back</div>
      <div class="edit__delete edit__button" @click="deleteFile">Delete</div>
    </div>

    <div class="edit__content">
      <textarea
        class="edit__file-name"
        v-model="title"
        placeholder="Title"
      ></textarea>
      <textarea
        class="edit__text"
        v-model="file.text"
        placeholder="Write Something..."
      ></textarea>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Edit",

  computed: {
    ...mapState({
      file: state => state.editingFile
    }),

    title: {
      get() {
        return this.file.title === "Untitled" ? "" : this.file.title;
      },
      set(newValue) {
        this.file.title = newValue;
      }
    }
  },

  methods: {
    ...mapActions(["deleteFile", "saveFile"]),

    back() {
      const editedFile = Object.assign({}, this.file, { updated: new Date() });
      this.saveFile({ file: editedFile });
      this.$router.go(-1);
    },

    deleteFile() {
      this.deleteFile({ file: this.file });
    }
  }
};
</script>

<style lang="scss">
.edit {
  &__header {
    box-sizing: border-box;
    text-align: center;
    background-color: #2c3e50;
    color: white;
    margin: 0;
    padding: 16px;
    height: 64px;
    display: flex;
    align-items: center;
  }

  &__button {
    padding: 8px;
    cursor: pointer;
  }

  &__back {
    text-decoration: none;

    &:visited {
      color: white;
    }
  }

  &__delete {
    margin-left: auto;
  }

  &__content {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  &__file-name,
  &__text {
    outline: none;
    border: none;
    padding: 16px;
    font-family: "Port Lligat Slab", serif;
  }

  &__file-name {
    box-sizing: border-box;
    border-bottom: 1px solid rgba(#2c3e50, 0.3);
    font-weight: 500;
    min-height: 22px + 16px * 2;
    resize: vertical;
    font-size: 22px;
    width: 100vw;
  }

  &__text {
    flex-grow: 1;
    flex-basis: 100%;
    resize: none;
    overflow-y: scroll;
    font-size: 18px;
    line-height: 1.6;
  }
}
</style>
