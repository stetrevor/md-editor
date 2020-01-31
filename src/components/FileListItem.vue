<template>
  <div class="file-list-item">
    <div class="file-list-item__title">
      {{ item.title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss">
.file-list-item {
  box-sizing: border-box;
  padding: 8px 16px;
  height: 64px;
  border-bottom: 1px solid rgba(#2c3e50, 0.3);
  font-size: 1em;

  display: flex;
  align-items: center;

  &__title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
