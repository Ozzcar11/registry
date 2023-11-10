<template>
  <main class="support">
    <section class="articles">
      <div class="container">
        <h2>Меры поддержки</h2>

        <div class="support__list">
          <AppSupport
            v-for="i of 8"
            :key="i"
            href="#"
            title="Меры поддержки промышленности"
            image="https://www.ixbt.com/img/n1/news/2022/0/1/5f6c5369ec05c4fe2700000f_large.jpg"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import AppSupport from '@/components/AppSupport'
export default {
  name: 'support',
  components: {
    AppSupport
  }
}
</script>

<style lang="scss" scoped>
.support {
  padding: 50px 0 120px;
  &__list {
    margin-top: 100px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 60px;
  }
}
</style>
