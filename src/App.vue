<template>
  <div id="app">
    <router-view />

    <div class="upgrade-dialog" v-if="prompt">
      <div class="upgrade-dialog__message">
        A new version is found. Refresh to load it?
      </div>
      <div
        class="upgrade-dialog__button upgrade-dialog__button--accept"
        @click="upgrade"
      >
        Refresh
      </div>
      <div
        class="upgrade-dialog__button upgrade-dialog__button--cancel"
        @click="prompt = false"
      >
        Later
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.prompt = true;
      });
    }
  },
  methods: {
    async upgrade() {
      this.prompt = false;
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    }
  },
  data() {
    return {
      prompt: false
    };
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Bitter&display=swap&subset=latin-ext");

body {
  margin: 0;
  padding: 0;
  font-family: "Bitter", serif;
  font-size: 16px;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.upgrade-dialog {
  position: fixed;
  bottom: 64px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 4px;
  box-sizing: border-box;
  padding: 8px 12px;
  color: white;
  background-color: #2c3e50;
  box-shadow: 0 4px 4px rgba(#2c3e50, 0.4);
  display: grid;
  grid-template-columns: 1fr max-content;
  gap: 8px;
  &__message {
    grid-column: 1 / 3;
  }
  &__button {
    padding: 0 8px;
    height: 36px;
    line-height: 36px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    &--accept {
      justify-self: end;
    }
  }
}
</style>
