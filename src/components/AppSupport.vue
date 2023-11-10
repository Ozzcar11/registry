<template>
  <a :href="href" class="app-support">
    <div class="border">
      <img :src="image">
    </div>

    <p class="title">
      {{ title }}
    </p>
  </a>
</template>

<script>
export default {
  name: 'AppSupport',
  props: {
    href: {
      type: String,
      default: null
    },
    image: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.app-support {
  text-decoration: none;
  color: inherit;

  .border {
    height: 240px;
    width: 100%;
    position: relative;
    overflow: hidden;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  .title {
    margin-top: 24px;
    font-weight: bold;
    font-size: 20px;
    line-height: 36px;
  }
}
</style>
