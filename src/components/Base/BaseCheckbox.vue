<template>
  <label class="label">
    <input
      type="checkbox"
      class="label__checkbox"
      :checked="checked"
      :value="value"
      @change="onChange"
    >

    <div
      class="label__fake"
    />

    <span
      v-text="label"
      class="label__title"
    />
  </label>
</template>

<script>
export default {
  name: 'BaseCheckbox',
  props: {
    modelValue: {},
    value: {},
    label: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      localChecked: false
    }
  },
  computed: {
    isArray () {
      return Array.isArray(this.modelValue)
    },
    checked () {
      if (this.isArray) {
        return this.localChecked.includes(this.value)
      } else {
        return this.localChecked
      }
    }
  },
  watch: {
    modelValue: 'init'
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      if (this.isArray) {
        this.localChecked = this.modelValue.slice()
      } else {
        this.localChecked = !!this.modelValue
      }
    },
    onChange (event) {
      if (this.isArray) {
        const exists = this.localChecked.includes(this.value)

        if (exists) {
          this.localChecked = this.localChecked.filter(item => item !== this.value)
        } else {
          this.localChecked.push(this.value)
        }

        this.$emit('update:modelValue', this.localChecked)
      } else {
        this.$emit('update:modelValue', event.target.checked)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.label {
  display: flex;
  align-items: center;
  padding: 5px 0;
  user-select: none;
  cursor: pointer;

  &__checkbox {
    display: none;
  }

  &__checkbox:checked + div {
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTEiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMSAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTguNzEyMzMgMS4yMTI2MUM4Ljg4ODQyIDEuMDQ0OTcgOS4xMjI3NCAwLjk1MjI4OSA5LjM2NTg1IDAuOTU0MTI4QzkuNjA4OTcgMC45NTU5NjggOS44NDE4NiAxLjA1MjE4IDEwLjAxNTQgMS4yMjI0NkMxMC4xODg5IDEuMzkyNzUgMTAuMjg5NSAxLjYyMzc5IDEwLjI5NTkgMS44NjY4MkMxMC4zMDI0IDIuMTA5ODYgMTAuMjE0MSAyLjM0NTg5IDEwLjA0OTggMi41MjUxMUw1LjA2MjMzIDguNzYyNjFDNC45NzY1NyA4Ljg1NDk4IDQuODczMDYgOC45MjkxMSA0Ljc1OCA4Ljk4MDU2QzQuNjQyOTMgOS4wMzIwMiA0LjUxODY3IDkuMDU5NzQgNC4zOTI2NCA5LjA2MjA4QzQuMjY2NjIgOS4wNjQ0MSA0LjE0MTQyIDkuMDQxMzEgNC4wMjQ1MyA4Ljk5NDE1QzMuOTA3NjMgOC45NDY5OSAzLjgwMTQ1IDguODc2NzQgMy43MTIzMyA4Ljc4NzYxTDAuNDA0ODMxIDUuNDgwMTFDMC4zMTI3MjIgNS4zOTQyOCAwLjIzODg0NSA1LjI5MDc4IDAuMTg3NjA1IDUuMTc1NzhDMC4xMzYzNjUgNS4wNjA3OCAwLjEwODgxMiA0LjkzNjY0IDAuMTA2NTkxIDQuODEwNzZDMC4xMDQzNyA0LjY4NDg4IDAuMTI3NTI2IDQuNTU5ODQgMC4xNzQ2NzggNC40NDMxMUMwLjIyMTgyOSA0LjMyNjM3IDAuMjkyMDEgNC4yMjAzMyAwLjM4MTAzMyA0LjEzMTMxQzAuNDcwMDU3IDQuMDQyMjggMC41NzYwOTkgMy45NzIxIDAuNjkyODM0IDMuOTI0OTVDMC44MDk1NjkgMy44Nzc4IDAuOTM0NjA2IDMuODU0NjQgMS4wNjA0OCAzLjg1Njg3QzEuMTg2MzYgMy44NTkwOSAxLjMxMDUgMy44ODY2NCAxLjQyNTUgMy45Mzc4OEMxLjU0MDUgMy45ODkxMiAxLjY0NCA0LjA2MyAxLjcyOTgzIDQuMTU1MTFMNC4zNDczMyA2Ljc3MTM2TDguNjg4NTggMS4yNDAxMUM4LjY5NjQgMS4yMzA0OCA4LjcwNDc0IDEuMjIxMyA4LjcxMzU4IDEuMjEyNjFIOC43MTIzM1oiIGZpbGw9IiMwNjEyMzciLz4KPC9zdmc+Cg==");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 55%;
  }

  &__fake {
    width: 20px;
    height: 20px;
    display: inline-block;
    background: #F0F4F9;
    border-radius: 4px;
    flex-shrink: 0;
  }

  &__title {
    margin-left: 12px;
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
