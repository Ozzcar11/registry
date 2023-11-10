<template>
  <div class="partner">
    <div class="info">
      <div class="title">{{ title }}</div>
      <div class="industry">{{ industry }}</div>
      <div class="date">На портале с {{ date }}</div>
      <div class="address">{{ address }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardPartner',
  props: {
    image: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    industry: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.partner {
  display: flex;
  border: 1px solid #e0e3e7;
  padding: 50px 30px;

  .info {
    margin-left: 20px;

    .title {
      font-weight: 600;
      font-size: 28px;
    }

    .industry,
    .date {
      margin-top: 30px;
      font-weight: 500;
      font-size: 21px;
      color: #848b9a;
    }

    .address {
      font-weight: 500;
      font-size: 21px;
      margin-top: 30px;
    }
  }
}
</style>
