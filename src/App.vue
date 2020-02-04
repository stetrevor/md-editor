<template>
  <div id="app" :style="fontStyle" v-if="ready">
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
import { mapState, mapActions } from "vuex";

export default {
  async created() {
    if (this.$workbox) {
      this.$workbox.addEventListener("waiting", () => {
        this.prompt = true;
      });
    }

    this.ready = false;
    await this.getFontPreference();
    this.ready = true;
  },

  computed: mapState({
    fontStyle: state => ({
      fontFamily: state.settings.fontPreference + ", serif"
    })
  }),

  methods: {
    ...mapActions(["getFontPreference"]),

    async upgrade() {
      this.prompt = false;
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    }
  },

  data() {
    return {
      prompt: false,
      ready: false
    };
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Alegreya:400,500|Crimson+Pro:300,400,500|Eczar:400,500|Neuton:300,400,700|Rasa:400,500|Vesper+Libre:400,500|Vollkorn:400,600|Alegreya:400,500&display=swap&subset=cyrillic,cyrillic-ext,devanagari,greek,greek-ext,gujarati,latin-ext,vietnamese");

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
