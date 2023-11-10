<template>
  <select
      class="select"
      @change="onChange($event.target.value)"
  >
    <option
        v-for="{ value, text, disabled } of options"
        :key="value"
        :value="value"
        :selected="isSelected(value)"
        :disabled="disabled"
    >
      {{ text }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'BaseSelect',
  props: {
    options: {
      type: Array, // [{ value: '', text: '', disabled: true/false }]
      default: () => []
    },
    modelValue: {
      type: [Number, String],
      default: ''
    }
  },
  methods: {
    onChange (value) {
      this.$emit('update:modelValue', value)
    },
    isSelected (value) {
      return String(this.modelValue) === String(value)
    }
  }
}
</script>

<style lang="scss" scoped>
$input-md-size                            : 45px !default;

.select {
  display: block;
  padding: 0 16px;
  width: 100%;
  height: $input-md-size;
  border-radius: 6px;
  border: none;
  outline: none;
  font-weight: 400;
  font-size: 16px;
  color: #000;
  appearance: none;
  background-color: #F0F4F9;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIgNEw3IDlMMTIgNCIgc3Ryb2tlPSIjMDYxMjM3IiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg==");
  background-repeat: no-repeat;
  background-position: center right 16px;
  background-size: 12px;
}
</style>
