<template>
  <div class="category">
    <div class="photo">
      <img :src="image">
    </div>
    <div class="info">
      <p class="title">{{ title }}</p>
      <p class="desc">{{ desc }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppCategory',
  props: {
    image: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.category {
  display: flex;

  .photo {
    width: 72px;
    height: 72px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      display: block;
      max-width: 100%;
      max-height: 100%;
    }
  }

  .info {
    margin-left: 40px;
  }
  .title {
    font-weight: 600;
    font-size: 28px;
    line-height: 1.4;
  }
  .desc {
    font-weight: 500;
    font-size: 16px;
    line-height: 1.5;
    margin-top: 12px;
  }
}
</style>
