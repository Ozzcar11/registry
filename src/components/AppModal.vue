<template>
  <teleport to="body">
    <div
      v-if="isOpen"
      class="app-modal"
      @mousedown.self="close"
    >
      <div
        class="content"
        v-bind="$attrs"
      >
        <slot />
      </div>
    </div>
  </teleport>
</template>

<script>
export default {
  name: 'AppModal',
  data () {
    return {
      isOpen: false
    }
  },
  watch: {
    isOpen (newVal) {
      const body = document.querySelector('body')

      if (newVal) {
        body.style.overflow = 'hidden'
      } else {
        body.style.overflow = ''
      }
    }
  },
  methods: {
    open () {
      this.isOpen = true
    },
    close () {
      this.isOpen = false
    }
  }
}
</script>

<style lang="scss" scoped>
.app-modal {
  background: rgba(79, 79, 79, 0.58);
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .content {
    background: rgba(255, 255, 255, 1);
    padding: 32px;
    border-radius: 8px;
    position: relative;
    max-height: 90vh;
    overflow: auto;
  }
}
</style>
