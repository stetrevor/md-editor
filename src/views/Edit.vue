<template>
  <div class="edit">
    <div class="edit__header">
      <router-link to="/" class="edit__back edit__button">Back</router-link>
      <div class="edit__delete edit__button" @click="remove">Delete</div>
    </div>

    <div class="edit__content">
      <textarea
        class="edit__file-name"
        v-model="file.name"
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
export default {
  name: "Edit",

  methods: {
    remove() {
      console.log("remove");
    }
  },

  data() {
    return {
      file: {
        name: "First-Page-2020-01-29-Beijing.md",
        text:
          "In web design you can achieve an optimal number of characters per line by restricting the width of your text blocks using em or pixels. (You achieve the best results with em but it can also be a bit more tricky to work with than pixels.) Regardless of which one you choose, your layout will have to be in a fixed width if you want to achieve an optimal line length for the majority of your visitors.\n\nThis is one of the reasons we don’t recommend using entirely liquid layouts – you practically force the user to resize their browser window if they want a good reading experience on your site. When you consider the myriad of different window sizes used nowadays, it’s obvious that a liquid layout will result in a more or less random line length."
      }
    };
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
