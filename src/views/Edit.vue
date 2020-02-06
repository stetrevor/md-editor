<template>
  <div class="edit">
    <div class="edit__header">
      <div class="edit__back edit__button" @click="back">Back</div>
      <div class="edit__settings edit__button" @click="showSettings = true">
        Settings
      </div>
      <div class="edit__delete edit__button" @click="deletingArticle = true">
        Delete
      </div>
    </div>

    <div class="edit__save-status">{{ saveStatus }}</div>

    <div class="edit__content">
      <textarea
        class="edit__title"
        :style="titleStyle"
        v-model.trim="title"
        placeholder="Title"
      />

      <div class="edit__divider"></div>

      <textarea
        class="edit__text"
        :style="textStyle"
        v-model.trim="file.text"
        placeholder="Write Something..."
      ></textarea>
    </div>

    <div class="edit__title-height" :style="titleStyle"></div>

    <transition name="pop-up">
      <bottom-sheet
        title="Settings"
        confirm-text="Save"
        v-if="showSettings"
        @bottom-sheet__cancel="cancelPreviewStyle"
        @bottom-sheet__confirm="
          setFont();
          showSettings = false;
        "
      >
        <h1 class="edit__settings-title">Font</h1>
        <font-list-item
          v-for="style in styles"
          :key="style.fontFamily"
          :name="style.fontFamily"
          :active="selectedStyle.fontFamily === style.fontFamily"
          @click.native="
            previewStyle = selectedStyle;
            selectedStyle = style;
          "
        />

        <h1 class="edit__settings-title">Contrast</h1>
        <div class="edit__settings-contrast">
          <vue-slider
            class="edit__settings-contrast-slider"
            v-model="luminancePercentage"
            :min="0"
            :max="34"
            :contained="true"
            tooltip="none"
          />
        </div>
      </bottom-sheet>
    </transition>

    <transition name="pop-up">
      <bottom-sheet
        text="Are you sure to delete the article?"
        v-if="deletingArticle"
        confirm-text="Delete"
        @bottom-sheet__cancel="deletingArticle = false"
        @bottom-sheet__confirm="
          deletingArticle = false;
          remove();
        "
      />
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BottomSheet from "@/components/BottomSheet";
import FontListItem from "@/components/FontListItem";

import VueSlider from "vue-slider-component";

import { fromEvent, of, from, merge, empty, concat, defer } from "rxjs";
import {
  delay,
  map,
  mergeMap,
  tap,
  debounceTime,
  distinctUntilChanged,
  mapTo,
  filter,
  share,
  switchAll
} from "rxjs/operators";

function setupAutoSave(input1, input2, saveFunc, statusFunc) {
  let savesInProgress = 0;

  const keyup1$ = fromEvent(input1, "keyup");
  const keyup2$ = fromEvent(input2, "keyup");
  const save = () => from(saveFunc());
  const input1ToSave$ = keyup1$.pipe(
    debounceTime(200),
    map(e => e.target.value),
    distinctUntilChanged(),
    share()
  );
  const input2ToSave$ = keyup2$.pipe(
    debounceTime(200),
    map(e => e.target.value),
    distinctUntilChanged(),
    share()
  );
  const inputsToSave$ = merge(input1ToSave$, input2ToSave$);
  const savesInProgress$ = inputsToSave$.pipe(
    mapTo(of("Saving...")),
    tap(() => savesInProgress++)
  );
  const savesCompleted$ = inputsToSave$.pipe(
    mergeMap(save),
    tap(() => savesInProgress--),
    filter(() => !savesInProgress),
    mapTo(
      concat(
        of("Saved!"),
        empty().pipe(delay(2000)),
        defer(() => of(`Updated at ${new Date().toLocaleTimeString()}`))
      )
    )
  );

  merge(savesInProgress$, savesCompleted$)
    .pipe(switchAll())
    .subscribe(statusFunc);
}

export default {
  name: "Edit",

  components: { BottomSheet, FontListItem, VueSlider },

  computed: {
    ...mapState({
      file: state =>
        state.editingFile ? state.editingFile : { title: "", text: "" },
      fontPreference: state => state.settings.fontPreference
    }),

    title: {
      get() {
        return this.file.title === "Untitled" ? "" : this.file.title;
      },
      set(newValue) {
        this.file.title = newValue;
      }
    },

    styles() {
      const color = this.textColor;

      return this.fonts.map(
        ([
          fontFamily,
          fontSize = "14px",
          lineHeight = 1.6,
          letterSpacing = "0px",
          fontWeight = "400"
        ]) => ({
          fontFamily,
          fontSize,
          lineHeight,
          color,
          letterSpacing,
          fontWeight
        })
      );
    },

    titleStyle() {
      return { fontFamily: this.selectedStyle.fontFamily };
    },

    // In HSL color model, when L is <= 34%, contrast ratio is above 7 against white background.
    // When L is 0%, contrast ratio is 21 against white background.
    textColor() {
      return `hsl(0, 0%, ${34 - this.luminancePercentage}%)`;
    },

    textStyle() {
      return Object.assign({}, this.selectedStyle, { color: this.textColor });
    }
  },

  methods: {
    ...mapActions([
      "deleteFile",
      "saveFile",
      "setEditingFile",
      "setFontPreference"
    ]),

    back() {
      // this.save();
      this.$router.go(-1);
    },

    remove() {
      this.deleteFile({ file: this.file });
      this.$router.go(-1);
    },

    save() {
      const editedFile = Object.assign({}, this.file, { updated: new Date() });
      return this.saveFile({ file: editedFile });
    },

    setFont() {
      this.setFontPreference({ font: this.selectedStyle.fontFamily });
    },

    cancelPreviewStyle() {
      this.showSettings = false;
      if (this.previewStyle !== null) {
        this.selectedStyle = this.previewStyle;
        this.previewStyle = null;
      }
    }
  },

  mounted() {
    const input1 = this.$el.querySelector(".edit__title");
    const input2 = this.$el.querySelector(".edit__text");
    const saveFunc = this.save;
    const statusFunc = value => (this.saveStatus = value);
    setupAutoSave(input1, input2, saveFunc, statusFunc);

    this.titleEl = input1;
    this.titleHeight = this.$el.querySelector(".edit__title-height");
  },

  watch: {
    title: {
      handler(newValue) {
        this.$nextTick().then(() => {
          this.titleHeight.textContent = newValue || "TEST";
          this.titleEl.style.height =
            this.titleHeight.getBoundingClientRect().height + "px";
        });
      },
      immediate: true
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => vm.setEditingFile({ id: parseInt(to.params.id) }));
  },

  beforeRouteUpdate(to, from, next) {
    this.setEditingFile({ id: parseInt(to.params.id) });
    next();
  },

  data() {
    return {
      saveStatus: "",
      showSettings: false,
      deletingArticle: false,
      fonts: [
        ["Vesper Libre"],
        ["Rasa", "15px", undefined],
        ["Alegreya", "14px", 1.9, "0.02em", 500],
        ["Crimson Pro", "15px", undefined],
        // ["Solway", "13px", 1.8, undefined, "-0.02em"],
        ["Eczar", "13px", 1.8, "0.02em"],
        // ["Yrsa", "15px", undefined, "#484848"], // Latin only version of Rasa
        // ["Spectral", "13px", 1.8, "#505050"],
        ["Neuton", "15px", 1.8, "0.02em"],
        ["Vollkorn", undefined, 1.8]
      ],
      selectedStyle: { fontFamily: "" },
      previewStyle: null,
      luminancePercentage: 0
    };
  },

  created() {
    this.selectedStyle = this.styles.find(
      style => style.fontFamily === this.fontPreference
    );
  }
};
</script>

<style lang="scss">
@import "../scss/transitions";

$themeColor: #2c3e50;
@import "~vue-slider-component/lib/theme/default.scss";

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
    user-select: none;
  }

  &__back {
    text-decoration: none;

    &:visited {
      color: white;
    }
  }

  &__settings {
    margin-left: auto;
    margin-right: auto;
  }

  &__save-status {
    width: 100%;
    height: 32px;
    font-size: 10px;
    color: #757575;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__content {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 64px - 32px);
  }

  &__title,
  &__text {
    outline: none;
    border: none;
    box-sizing: border-box;
    padding: 16px;
    font-family: "Bitter", serif;
  }

  &__title {
    min-height: 22px * 1.6;
    color: #2c3e50;
  }

  &__title,
  &__title-height {
    font-weight: 500;
    font-size: 22px;
    line-height: 1.6;
    width: 100vw;
    resize: none;
  }

  &__title-height {
    font-family: "Bitter", serif;
    outline: none;
    border: none;
    box-sizing: border-box;
    position: absolute;
    top: 64px;
    background-color: rgba(red, 0.2);
    visibility: hidden;
    padding: 16px;
  }

  &__divider {
    margin: 8px 0;
    width: 100vw;
    min-height: 1px;
    background-color: rgba(#2c3e50, 0.3);
  }

  &__text {
    flex-grow: 1;
    flex-basis: 100%;
    resize: none;
    overflow-y: scroll;

    font-size: 13px;
    line-height: 2;
    color: #585858;

    padding-bottom: 64px;
  }

  &__settings-title {
    font-size: 18px;
    margin: 8px 0 16px;
  }
}
</style>
