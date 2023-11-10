<template>
  <div class="contact">
    <BaseIcon
      :name="icon"
      class="icon"
    />
    <span class="text">{{ text }}</span>
  </div>
</template>

<script>
import BaseIcon from '@/components/Base/BaseIcon'
export default {
  name: 'AppContact',
  components: {
    BaseIcon
  },
  props: {
    icon: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.contact {
  display: flex;
  align-items: center;

  .icon {
    width: 20px;
  }
  .text {
    display: block;
    margin-left: 12px;
    font-weight: 500;
  }
}
</style>
