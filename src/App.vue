<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<script>
import DefaultLayout from './layouts/default'
import EmptyLayout from './layouts/empty'

export default {
  name: 'App',
  components: {
    DefaultLayout,
    EmptyLayout
  },
  computed: {
    layout () {
      const layout = this.$route.meta.layout || 'EmptyLayout'
      return layout
    }
  }
}
</script>

<style>
</style>
