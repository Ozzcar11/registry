<template>
  <span class="error">
    <slot />
  </span>
</template>

<script>
export default {
  name: 'BaseError'
}
</script>

<style lang="scss" scoped>
.error {
  color: red;
  font-size: 12px;
  display: block;
}
</style>
