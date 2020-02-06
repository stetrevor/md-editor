<template>
  <div class="bottom-sheet">
    <div
      class="bottom-sheet__backdrop"
      @click.self="$emit('bottom-sheet__cancel')"
    >
      <div class="bottom-sheet__sheet">
        <h1 class="bottom-sheet__title" v-if="title">{{ title }}</h1>

        <div class="bottom-sheet__content">
          <p class="bottom-sheet__text" v-if="text">{{ text }}</p>
          <slot></slot>
        </div>

        <div class="bottom-sheet__actions" v-if="actions">
          <div
            class="bottom-sheet__action bottom-sheet__action--cancel"
            @click="$emit('bottom-sheet__cancel')"
          >
            Cancel
          </div>
          <div
            class="bottom-sheet__action"
            @click="$emit('bottom-sheet__confirm')"
          >
            {{ confirmText || "Ok" }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BottomSheet",

  props: {
    title: {
      type: String
    },
    text: {
      type: String
    },
    confirmText: {
      type: String
    },

    actions: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss">
.bottom-sheet {
  user-select: none;
  box-shadow: 0 -4px 8px rgba(#2c3e50, 0.5);

  &__backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__sheet {
    position: absolute;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    padding: 16px;
    background-color: lighten(#2c3e50, 70%);
  }

  &__title {
    margin: 0;
    font-size: 22px;
    line-height: 1.5;
  }

  &__text,
  &__content {
    padding: 16px 0;
  }

  &__actions {
    display: flex;
    width: 100%;
    height: 48px;
    justify-content: center;
    align-items: center;
  }

  &__action {
    flex-grow: 1;
    padding: 8px;
    text-align: center;
    cursor: pointer;

    &--cancel {
      margin-right: 16px;
    }
  }
}
</style>
