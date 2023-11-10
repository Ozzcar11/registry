<template>
  <ul>
    <AppItem
        :modelValue="modelValue"
        :item="localTree"
        @check="onCheck"
    />
  </ul>
</template>

<script>
import AppItem from './AppItem'
import { mapActions } from 'vuex'

export default {
  name: 'TreeCheckbox',
  components: {
    AppItem
  },
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    tree: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      localTree: {},
      selectedLocal: this.modelValue.slice(0)
    }
  },
  watch: {
    tree: 'initTree'
  },
  created () {
    this.initTree()
  },
  methods: {
    ...mapActions(['IDtoStore', 'removeIDs']),
    onCheck ({ item, value }) {
      function getChildIds (root, currentItemId) {
        const result = []

        function getIds (root) {
          result.push(root.id)

          if (root.children && root.children.length) {
            for (const i of root.children) {
              getIds(i)
            }
          }
        }

        getIds(root)
        return result.filter(i => i !== currentItemId)
      }

      function getParentIds (root) {
        const result = []

        function findParent (item) {
          result.push(item.id)

          if (item.parent !== null && typeof item.parent === 'object') {
            findParent(item.parent)
          }
        }

        findParent(root)

        return result
      }

      const setIds = ids => {
        this.selectedLocal = Array.from(new Set(this.selectedLocal.concat(ids)))
      }
      const removeIds = ids => {
        this.selectedLocal = this.selectedLocal.filter(i => !ids.includes(i))
        this.selectedLocal = this.selectedLocal.filter(i => !ids.includes(i))
      }
      const checkNeighbors = root => {
        if (!root.parent && !root.parent?.length) {
          return
        }

        const flags = []

        root.parent.children.forEach(item => {
          flags.push(this.selectedLocal.includes(item.id))
        })

        if (!flags.includes(false)) {
          setIds([root.parent.id])
        }
      }

      const itemId = item.id
      const childIds = getChildIds(item, itemId)
      const parentIds = getParentIds(item)

      if (value) {
        setIds([itemId, ...childIds])
        checkNeighbors(item)

        this.IDtoStore(this.selectedLocal)
      } else {
        removeIds(parentIds)
        removeIds(childIds)

        this.removeIDs({ parentIds, childIds })
      }
      this.$emit('update:modelValue', this.selectedLocal)
    },
    initTree () {
      this.localTree = JSON.parse(JSON.stringify(this.tree))

      function setProps (root, parent = null) {
        root.parent = parent

        if (root.children && root.children.length) {
          for (const item of root.children) {
            setProps(item, root)
          }
        }
      }

      setProps(this.localTree)
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  padding-left: 2rem;
  line-height: 1.5em;
  list-style: none;
}
</style>
