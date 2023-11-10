import { ref, computed } from 'vue'
import apiFunc from '@/api'

const api = apiFunc()

export default function () {
  /* DATA */
  const tree = ref([])

  /* METHODS */
  async function fetchTree () {
    const res = await api.activities.list()
    const data = res.data.comments ?? []
    tree.value = data.map(i => ({
      value: [], options: i
    }))
  }

  /* COMPUTED */
  const selectedItems = computed(() => {
    let result = []

    tree.value.forEach(i => {
      result = result.concat(i.value)
    })

    return result
  })

  return {
    tree,
    selectedItems,
    fetchTree
  }
}
