<template>
  <a :href="href" class="service">
    <div class="photo">
      <img :src="image">
    </div>

    <p class="title">
      {{ title }}
    </p>
  </a>
</template>

<script>
export default {
  name: 'AppService',
  props: {
    href: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.service {
  text-decoration: none;
  font: inherit;
  color: inherit;
  cursor: pointer;
  padding: 40px;
  border-radius: 15px;
  transition: .15s;
  display: block;

  &:hover {
    box-shadow: 0 0 30px #E2E9FC;
  }

  .photo {
    width: 72px;
    height: 72px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      display: block;
      max-width: 100%;
      max-height: 100%;
    }
  }

  .title {
    margin-top: 24px;
    font-weight: 600;
    font-size: 18px;
    text-align: center;
  }
}
</style>
