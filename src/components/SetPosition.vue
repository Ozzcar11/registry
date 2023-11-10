<template>
  <div class="root">
    <h3>Укажите свой адрес</h3>
    <div id="map" />

    <div v-if="address" class="panel">
      <p><b>Ваш адрес:</b> {{ address }}</p>
      <BaseButton @click="$emit('ok')">Ок</BaseButton>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/Base/BaseButton'
let map = null

export default {
  name: 'SetPosition',
  components: {
    BaseButton
  },
  props: {
    address: String
  },
  mounted () {
    this.initMap()
  },
  methods: {
    createScript () {
      const script = document.createElement('script')
      script.setAttribute('src', 'https://api-maps.yandex.ru/2.1/?apikey=8ec221f0-712c-467a-847e-d85ffe111e7a&lang=ru_RU')
      document.head.appendChild(script)
      return script
    },
    initMap (settings = {}) {
      const {
        center = [43.02424773258698, 47.22395318957884],
        zoom = 10
      } = settings

      const script = this.createScript()

      script.onload = () => {
        window.ymaps.ready(() => {
          map = new window.ymaps.Map('map', { center, zoom })

          map.events.add('click', this.setPlacemark)
        })
      }
    },
    setPlacemark (e) {
      const coords = e.get('coords')
      map.geoObjects.removeAll()
      map.geoObjects.add(new window.ymaps.Placemark(coords))

      this.$emit('set', coords)
    }
  }
}
</script>

<style lang="scss" scoped>
.root {
  #map {
    margin-top: 30px;
    height: 600px;
    width: 100%;
  }

  .panel {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
