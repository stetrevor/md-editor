<template>
  <div
    class="base-button"
    :class="{ 'base-button--disabled': disabled }"
    @click="disabled ? '' : $emit('base-button__clicked')"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "BaseButton",

  props: {
    disabled: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="scss">
.base-button {
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  user-select: none;

  &--disabled {
    opacity: 0.3;
  }
}
</style>
