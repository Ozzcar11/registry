<template>
  <a
    :href="href"
    class="link"
  >
    <span><slot /></span>
    <BaseIcon name="icon-right" class="icon" />
  </a>
</template>

<script>
import BaseIcon from '@/components/Base/BaseIcon'
export default {
  name: 'AppLink',
  components: {
    BaseIcon
  },
  props: {
    href: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.link {
  display: flex;
  align-items: center;
  color: inherit;
  text-decoration: none;

  .icon {
    margin-left: 8px;
    width: 8px;
  }
}
</style>
