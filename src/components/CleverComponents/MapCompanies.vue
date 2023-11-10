<template>
  <div id="map" />
</template>

<script>
let map = null

export default {
  name: 'MapCompanies',
  props: {
    companies: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    companies: 'rewritePlacemarks'
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

          this.rewritePlacemarks()
        })
      }
    },
    rewritePlacemarks () {
      if (map) {
        this.removePlacemarks()
        this.drawPlacemarks()
      }
    },
    drawPlacemarks () {
      this.companies.forEach(item => {
        map.geoObjects.add(new window.ymaps.Placemark(item.coords, {
          balloonContent: item.html
        }))
      })
    },
    removePlacemarks () {
      map.geoObjects.removeAll()
    }
  }
}
</script>

<style lang="scss" scoped>
#map {
  height: 700px;
  width: 100%;
}
</style>
