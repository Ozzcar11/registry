<template>
  <div class="default-layout">
    <div class="header">
      <div class="container">
        <a href="/" class="logo">
          <img
            src="/images/logo.png"
            alt="Логотип"
            class="logo__image"
          >
          <p class="logo__title">
            ПОРТАЛ<br>КООПЕРАЦИИ
          </p>
        </a>

        <div class="panel">
          <BaseButton
            theme="naked"
            class="panel__btn"
            @click="$refs.login.open()"
          >
            Вход
          </BaseButton>
          <BaseButton
            class="panel__btn"
            square
            href="/register"
          >
            Регистрация
          </BaseButton>
        </div>
      </div>
    </div>

    <slot />

    <div class="footer">
      <div class="container">
        <div class="footer__left">
          <BaseButton
            square
            size="elg"
            href="/register"
          >
            Регистрация
          </BaseButton>
        </div>

        <div class="contacts">
          <div class="contacts__title">Техническая поддержка</div>

          <div class="contacts-list">
            <AppContact
              icon="phone"
              text="+7 (495) 127-04-56"
              class="contacts-list__item"
            />
            <AppContact
              icon="message"
              text="support@rdbalance.ru"
              class="contacts-list__item"
            />
          </div>
        </div>
      </div>
    </div>

    <ModalLogin ref="login" />
  </div>
</template>

<script>
import BaseButton from '@/components/Base/BaseButton'
import AppContact from '@/components/AppContact'
import ModalLogin from '@/components/CleverComponents/ModalLogin'

export default {
  name: 'LayoutDefault',
  components: {
    ModalLogin,
    AppContact,
    BaseButton
  }
}
</script>

<style lang="scss">
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .header {
    padding: 13px 0;
    background: #FFFFFF;
    box-shadow: 0 2px 10px #E1E9F4;

    .logo {
      display: flex;
      align-items: center;
      color: #000;
      text-decoration: none;

      &__image {
        display: block;
        width: 52px;
      }

      &__title {
        font-weight: bold;
        font-size: 16px;
        line-height: 1.45;
        margin-left: 10px;
      }
    }

    .container {
      display: flex;
      align-items: center;
    }

    .panel {
      margin-left: auto;

      &__btn:not(:first-child) {
        margin-left: 10px;
      }
    }
  }

  .footer {
    margin-top: auto;
    background: #061237;
    padding: 30px 0 50px;

    .container {
      display: flex;
    }

    .contacts {
      margin-left: 580px;
      color: #fff;

      &__title {
        font-weight: 600;
        font-size: 28px;
      }

      &-list {
        &__item {
          margin-top: 16px;
        }
      }
    }
  }
}
</style>
