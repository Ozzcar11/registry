<template>
  <ul
    v-if="pageCount > 0"
    class="pagination"
  >
    <li
      class="item control prev"
      :class="{ disabled: currentLocal === pages[0] }"
      data-test="prev"
      @click="onPrev"
    >
      <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.53125 0.9375L1.46875 6L6.53125 11.0625" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </li>

    <li
      v-for="(page, index) of pages"
      :key="index"
      class="item"
      :class="{ active: page === currentLocal }"
      @click="onChange(page)"
    >
      {{ page }}
    </li>

    <li
      class="item control next"
      :class="{ disabled: currentLocal === pages[pages.length - 1] }"
      data-test="next"
      @click="onNext"
    >
      <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.46875 0.9375L6.53125 6L1.46875 11.0625" stroke="black" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AppPagination',
  props: {
    modelValue: {
      type: Number
    },
    pageCount: {
      type: Number
    }
  },
  emits: [
    'update:modelValue'
  ],
  data () {
    return {
      currentLocal: this.modelValue,
      placeholderMore: '...'
    }
  },
  computed: {
    pages () {
      const result = []
      if (this.pageCount < 8) {
        for (let i = 0; i < this.pageCount; i++) {
          result.push(i + 1)
        }
      } else {
        if (this.currentLocal < 5) {
          for (let i = 0; i < 5; i++) {
            result.push(i + 1)
          }
          result.push(this.placeholderMore)
          result.push(this.pageCount)
        } else if (this.pageCount - this.currentLocal < 4) {
          result.push(1)
          result.push(this.placeholderMore)
          for (let i = this.pageCount - 5; i < this.pageCount; i++) {
            result.push(i + 1)
          }
        } else {
          result.push(1)
          result.push(this.placeholderMore)
          result.push(this.currentLocal - 1)
          result.push(this.currentLocal)
          result.push(this.currentLocal + 1)
          result.push(this.placeholderMore)
          result.push(this.pageCount)
        }
      }
      return result
    }
  },
  watch: {
    modelValue (newVal) {
      this.currentLocal = newVal
    },
    pageCount (newVal) {
      if (this.currentLocal > newVal) {
        this.currentLocal = newVal
      }
    }
  },
  methods: {
    onChange (page) {
      if (page === this.placeholderMore) { return }

      this.currentLocal = page
      this.$emit('update:modelValue', page)
    },
    onPrev () {
      const activeElIndex = this.pages.findIndex(i => i === this.currentLocal)
      const page = this.pages[activeElIndex - 1]

      this.onChange(page)
    },
    onNext () {
      const activeElIndex = this.pages.findIndex(i => i === this.currentLocal)
      const page = this.pages[activeElIndex + 1]

      this.onChange(page)
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;

  .item {
    width: 54px;
    height: 54px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1000px;
    cursor: pointer;
    user-select: none;
    font-size: 18px;
    font-weight: 500;

    &.active {
      background: #061237;
      border-radius: 5px;
      color: #fff;
    }

    &.control {
      .prev {
      }

      .next {
      }

      &.disabled {
        pointer-events: none;
        //cursor: not-allowed !important;
      }
    }
  }
}
</style>
