<template>
  <div class="input-wrapper">
    <input
      :type="type"
      :value="modelValue"
      class="input"
      @input="onInput($event)"
      @keypress.enter="$emit('enter')"
    >

    <div
      v-if="$slots.default"
      class="slot"
    >
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    modelValue: {
      type: [Number, String],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  emits: {
    'update:modelValue': null
  },
  methods: {
    onInput (event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
$input-md-size                            : 45px !default;

.input-wrapper {
  .input {
    display: block;
    padding: 0 16px;
    width: 100%;
    height: $input-md-size;
    background: #F0F4F9;
    border-radius: 6px;
    border: none;
    appearance: none;
    outline: none;
    font-weight: 400;
    font-size: 16px;
    color: #000;
  }

  .slot {
    margin-top: 8px;
  }
}
</style>
