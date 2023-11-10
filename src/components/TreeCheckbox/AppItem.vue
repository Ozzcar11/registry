<template>
  <li class="item">
    <div class="preview">
      <span
        class="more"
        @click="toggle"
      >
        <template v-if="hasChildren && !isOpen">+</template>
        <template v-if="hasChildren && isOpen">-</template>
      </span>
      <BaseCheckbox
        :label="item.name"
        :value="item.id"
        :modelValue="modelValue.includes(item.id)"
        @update:modelValue="$emit('check', { item, value: $event })"
      />
    </div>
    <ul v-if="hasChildren && isOpen">
      <AppItem
        class="item"
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
        :modelValue="modelValue"
        @check="$emit('check', $event)"
      />
    </ul>
  </li>
</template>

<script>
import BaseCheckbox from '@/components/Base/BaseCheckbox'
export default {
  name: 'AppItem',
  components: {
    BaseCheckbox
  },
  props: {
    modelValue: Array,
    item: Object
  },
  data () {
    return {
      isOpen: false
    }
  },
  computed: {
    hasChildren () {
      return this.item.children && this.item.children.length
    }
  },
  methods: {
    toggle () {
      if (this.hasChildren) {
        this.isOpen = !this.isOpen
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  .preview {
    display: flex;
    align-items: center;

    .more {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 22px;
      font-weight: 600;
      margin-right: 12px;
      user-select: none;
    }
  }

  ul {
    padding-left: 2rem;
    list-style: none;
  }
}
</style>
