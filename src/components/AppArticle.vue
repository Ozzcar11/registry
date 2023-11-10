<template>
  <div class="article">
    <div class="photo">
      <img :src="image">
    </div>

    <BaseButton
      class="button"
      :href="href"
    >
      {{ title }}
    </BaseButton>

    <p class="desc">
      {{ desc }}
    </p>

    <div class="line" />

    <p class="date">
      {{ computedDate }}
    </p>
  </div>
</template>

<script>
import moment from 'moment'
import BaseButton from '@/components/Base/BaseButton'

export default {
  name: 'AppArticle',
  components: {
    BaseButton
  },
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
    },
    desc: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    }
  },
  computed: {
    computedDate () {
      const march = moment(this.date)
      march.locale('ru')
      return march.format('MMMM D, YYYY')
    }
  }
}
</script>

<style lang="scss" scoped>
.article {
  .photo {
    height: 330px;
    width: 100%;
    position: relative;
    overflow: hidden;
    border-radius: 10px;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: 0.1s;
    }
  }

  .button {
    margin-top: 20px;
  }

  .desc {
    font-style: normal;
    font-weight: 600;
    font-size: 21px;
    line-height: 1.3;
    margin-top: 20px;
  }

  .line {
    border-top: 1px solid #CBD9EC;
    margin-top: 20px;
  }

  .date {
    font-weight: 600;
    font-size: 14px;
    margin-top: 20px;
    text-transform: capitalize;
  }
}
</style>
