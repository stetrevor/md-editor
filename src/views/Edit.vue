<template>
  <div class="edit">
    <div class="edit__header">
      <div class="edit__back edit__button" @click="back">Back</div>
      <div class="edit__save-status">{{ saveStatus }}</div>
      <div class="edit__delete edit__button" @click="remove">Delete</div>
    </div>

    <div class="edit__content">
      <textarea
        class="edit__title"
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
    ...mapActions(["deleteFile", "saveFile", "setEditingFile"]),

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
    }
  },

  mounted() {
    const input1 = this.$el.querySelector(".edit__title");
    const input2 = this.$el.querySelector(".edit__text");
    const saveFunc = this.save;
    const statusFunc = value => (this.saveStatus = value);
    setupAutoSave(input1, input2, saveFunc, statusFunc);
  },

  beforeRouteEnter(to, from, next) {
    next(vm => vm.setEditingFile({ id: to.params.id }));
  },

  beforeRouteUpdate(to, from, next) {
    this.setEditingFile({ id: to.params.id });
    next();
  },

  data() {
    return {
      saveStatus: ""
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
    cursor: pointer;
  }

  &__back {
    text-decoration: none;

    &:visited {
      color: white;
    }
  }

  &__save-status {
    margin-left: auto;
    margin-right: auto;
  }

  &__content {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }

  &__title,
  &__text {
    outline: none;
    border: none;
    padding: 16px;
    font-family: "Port Lligat Slab", serif;
  }

  &__title {
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
