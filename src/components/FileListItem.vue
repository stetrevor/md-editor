<template>
  <div class="file-list-item">
    <p>{{ item.title }}</p>
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
}
</style>
