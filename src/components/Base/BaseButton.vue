<template>
  <component
    :is="computedTag"
    :href="href"
    :class="classes"
    :type="type"
    class="button"
    @click="$emit('click', $event)"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    href: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    theme: {
      type: String,
      default: 'main',
      validator: (val) =>
        ['main', 'success', 'danger', 'naked', 'grey'].includes(val)
    },
    pill: {
      type: Boolean,
      default: false
    },
    square: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'md'
    },
    block: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  computed: {
    computedTag() {
      if (this.href) {
        return 'a'
      }
      return 'button'
    },
    classes() {
      return [
        `button-${this.theme}`,
        `button-size-${this.size}`,
        { 'button-square': this.square },
        { 'button-pill': this.pill },
        { 'button-block': this.block }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
$input-md-size: 45px !default;
$input-lg-size: 55px !default;
$input-elg-size: 65px !default;

.button {
  border: none;
  font-weight: 500;
  font-size: 14px;
  padding: 0px 32px;
  transition: 0.2s;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border-radius: 4px;

  &-main {
    background: #1355ff;
    color: #fff;

    &:hover {
      background: #6891ff;
    }
  }

  &-success {
    background: #139d10;
    color: #fff;

    &:hover {
      background: #5bb958;
    }
  }

  &-danger {
    background: #d01717;
    color: #fff;

    &:hover {
      background: #c93f3f;
    }
  }

  &-grey {
    background: #c7d0ea;
    color: #000;

    &:hover {
      background: rgba(199, 208, 234, 0.7);
    }
  }

  &-naked {
    background: transparent;
  }

  /* BORDER */
  &-square {
    border-radius: 0;
  }

  &-pill {
    border-radius: 1000px;
  }
  /* BORDER */

  &-block {
    width: 100%;
  }

  /* SIZE */
  &-size {
    &-mini {
      color: #000;
      font-size: 14px;
      height: auto;
      padding: 10px;
      background-color: white;
      border: 1px solid #1355ff;
      white-space: nowrap;
      &:hover {
        color: #fff;
        background-color: #1355ff;
      }
    }
    &-md {
      height: $input-md-size;
    }
    &-lg {
      height: $input-lg-size;
    }
    &-elg {
      height: $input-elg-size;
      font-size: 16px;
    }
  }
  /* SIZE */
}
</style>
