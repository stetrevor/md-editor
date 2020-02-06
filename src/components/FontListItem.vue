<template>
  <div class="font-list-item" :class="{ 'font-list-item--active': active }">
    {{ name }}
  </div>
</template>

<script>
export default {
  name: "FontListItem",

  props: {
    name: {
      type: String,
      required: true
    },

    active: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss">
.font-list-item {
  height: 48px;
  padding: 0 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &--active {
    background-color: rgba(black, 0.3);
  }
}
</style>
