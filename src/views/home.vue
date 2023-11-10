<template>
  <main class="home">
    <section class="preview">
      <div class="container">
        <img
          src="/images/preview.png"
          class="preview__image"
        >

        <div class="preview__content">
          <h1 class="preview__title">Портал<br>кооперации</h1>
          <p class="preview__desc">промышленных предприятий<br>Дагестана</p>
          <router-link class="preview__link" to="/register">
            <BaseButton
                square
                size="elg"
                class="preview__btn"
            >
              Присоединиться
            </BaseButton>
          </router-link>
        </div>
      </div>
    </section>

    <section class="services">
      <div class="container">
        <h2 class="services__title">Функции нашего портала</h2>

        <div class="services-list">
          <AppService
            v-for="(service, index) of services"
            :key="index"
            v-bind="service"
          />
        </div>
      </div>
    </section>

    <section class="offer">
      <div class="container">
        <div class="offer__panel">
          <h2 class="offer__title">Мы подберем<br>для вас партнеров</h2>
          <BaseButton
            square
            size="elg"
            class="offer__btn"
          >
            Найти покупателей
          </BaseButton>
        </div>

        <img
          src="/images/map.png"
          class="offer__image"
        >
      </div>
    </section>

    <section class="categories">
      <div class="container">
        <h2 class="categories__title">Категории товаров</h2>
        <AppLink href="#">Посмотреть все</AppLink>

        <div class="categories-list">
          <AppCategory
            v-for="(category, index) of categories"
            :key="index"
            :image="category.image"
            :title="category.title"
            :desc="category.desc"
          />
        </div>
      </div>
    </section>

    <section class="news">
      <div class="container">
        <h2 class="news__title">Новости</h2>
        <AppLink href="#">Посмотреть все</AppLink>

        <div class="news-list">
          <AppArticle
            v-for="item of news"
            :key="item.id"
            :href="item.href"
            :image="item.image"
            :title="item.title"
            :desc="item.desc"
            :date="item.date"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import AppLink from '@/components/AppLink'
import AppCategory from '@/components/AppCategory'
import AppArticle from '@/components/AppArticle'
import AppService from '@/components/AppService'
import BaseButton from '@/components/Base/BaseButton'

export default {
  name: 'PageHome',
  components: {
    BaseButton,
    AppService,
    AppArticle,
    AppCategory,
    AppLink
  },
  data () {
    return {
      services: [
        {
          href: '/search-partners',
          image: '/images/service1.svg',
          title: 'Поиск партнеров'
        },
        {
          image: '/images/service2.svg',
          title: 'Расмещение и поиск товаров и услуг'
        },
        {
          href: '/support',
          image: '/images/service3.svg',
          title: 'Меры поддержки'
        },
        {
          image: '/images/service4.svg',
          title: 'Тендеры и закупки'
        },
        {
          image: '/images/service5.svg',
          title: 'Оформление заявок на закупку'
        },
        {
          image: '/images/service6.svg',
          title: 'Строящиеся объекты и необходимые материалы'
        }
      ],
      categories: [
        {
          image: '/images/category1.svg',
          title: 'Строительные материалы',
          desc: 'Материалы для строительства зданий и сооружений'
        },
        {
          image: '/images/category2.svg',
          title: 'Лифты',
          desc: 'Лифты и оборудование'
        },
        {
          image: '/images/category3.svg',
          title: 'Детские площадки',
          desc: 'Оборудование для детских и воркаут площадок'
        },
        {
          image: '/images/category4.svg',
          title: 'Машиностроение',
          desc: 'Продукция машиностроительного комплекса'
        },
        {
          image: '/images/category5.svg',
          title: 'Обувь и изделия из кожи',
          desc: 'Продукция из кожи и обувная'
        },
        {
          image: '/images/category6.svg',
          title: 'Швейные изделия',
          desc: 'Швейные изделия, мягкий инвентарь и СИЗы'
        }
      ],
      news: []
    }
  },
  created () {
    this.fetchNews()
  },
  methods: {
    async fetchNews () {
      this.news = await Promise.resolve([
        {
          id: 0,
          href: '#',
          image: '/images/temp------------------------------2.png',
          title: 'Правительство рд',
          desc: 'Военный комиссар Махачкалы - об осеннем призыве и военно-патриотическом воспитании',
          date: '11-11-2021'
        },
        {
          id: 2,
          href: '#',
          image: '/images/temp------------------------------1.png',
          title: 'Правительство рд',
          desc: 'Военный комиссар Махачкалы - об осеннем призыве и военно-патриотическом воспитании',
          date: '11-22-2021'
        },
        {
          id: 3,
          href: '#',
          image: '/images/temp------------------------------3.png',
          title: 'Правительство рд',
          desc: 'В горах Дагестана обнаружили майнинговую ферму',
          date: '11-12-2021'
        }
      ])
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  .preview {
    background-image: url('/images/bg2.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;

    .container {
      display: flex;
      padding-top: 157px;
    }

    &__content {
      padding-top: 85px;
      margin-left: 130px;
      color: #fff;
    }

    &__title {
      font-weight: 500;
      line-height: 1.13;
    }

    &__desc {
      margin-top: 40px;
      font-weight: 500;
      font-size: 24px;
      line-height: 1.5;
    }

    &__link {
      text-decoration: none;
    }

    &__btn {
      margin-top: 114px;
    }
  }

  .services {
    padding-top: 80px;
    padding-bottom: 160px;

    &__title {
      text-align: center;
    }

    &-list {
      margin-top: 50px;
      display: grid;
      grid-template-columns: repeat(3, 335px);
      grid-gap: 30px;
      justify-content: center;
    }
  }

  .offer {
    height: 620px;
    background-image: url('/images/bg1.png');
    background-repeat: no-repeat;
    background-position: top center;
    background-size: cover;

    .container {
      position: relative;
      height: 100%;
      display: flex;
      align-items: center;
    }

    &__panel {
      padding-left: 160px;
    }

    &__title {
      color: #fff;
    }

    &__btn {
      margin-top: 70px;
    }

    &__image {
      width: 449px;
      position: absolute;
      top: 0;
      right: 110px;
    }
  }

  .categories {
    padding-top: 140px;
    &__title {
      margin-bottom: 16px;
    }

    &-list {
      margin-top: 55px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 80px 50px;
    }
  }

  .news {
    padding: 140px 0 160px;

    &__title {
      margin-bottom: 16px;
    }

    &-list {
      margin-top: 55px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 40px;
    }
  }
}
</style>
