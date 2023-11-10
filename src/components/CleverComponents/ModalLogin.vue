<template>
  <AppModal ref="loginModal">
    <div class="login-modal">
      <div class="login-modal-logo">
        <img
          src="/images/logo.png"
          class="login-modal-logo__image"
        >
        <p class="login-modal-logo__title">
          ПОРТАЛ<br>КООПЕРАЦИИ
        </p>
      </div>

      <p class="login-modal__title">Авторизация</p>
      <p class="login-modal__subtitle">Введите свой логин и пароль в форме ниже.</p>

      <form @submit.prevent="onLogin">
        <BaseInput
          v-model="form.username"
          class="login-modal__input"
          placeholder="Логин"
        >
          <BaseError v-if="v$.form.$dirty && v$.form.username.required.$invalid">
            Обязательное поле
          </BaseError>
          <BaseError v-if="v$.form.$dirty && v$.form.username.minLength.$invalid">
            Минимум {{ v$.form.username.minLength.$params.min }} символов
          </BaseError>
        </BaseInput>
        <BaseInput
          v-model="form.password"
          type="password"
          class="login-modal__input"
          placeholder="Пароль"
        >
          <BaseError v-if="v$.form.$dirty && v$.form.password.required.$invalid">
            Обязательное поле
          </BaseError>
          <BaseError v-if="v$.form.$dirty && v$.form.password.minLength.$invalid">
            Минимум {{ v$.form.password.minLength.$params.min }} символов
          </BaseError>
        </BaseInput>
        <BaseButton
          block
          size="elg"
          style="margin-top: 36px;"
        >
          Войти
        </BaseButton>
      </form>

      <BaseButton
        block
        theme="naked"
        size="elg"
      >
        Забыли пароль?
      </BaseButton>
      <BaseButton
        block
        size="elg"
        theme="grey"
        href="/register"
      >
        Зарегистрироваться
      </BaseButton>
    </div>
  </AppModal>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, minLength } from '@vuelidate/validators'

import AppModal from '@/components/AppModal'
import BaseButton from '@/components/Base/BaseButton'
import BaseInput from '@/components/Base/BaseInput'
import BaseError from '@/components/Base/BaseError'

export default {
  name: 'ModalLogin',
  components: {
    AppModal,
    BaseButton,
    BaseInput,
    BaseError
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      form: {
        username: 'user12345',
        password: 'qwerty12345'
      }
    }
  },
  computed: {
  },
  methods: {
    async onLogin () {
      if (this.v$.form.$invalid) {
        this.v$.form.$touch()
        return
      }

      try {
        await this.$store.dispatch('auth/logIn', {
          username: this.form.username,
          password: this.form.password
        })

        this.$refs.loginModal.close()
      } catch (e) {
        console.log(e)
      }
    },
    open () {
      this.$refs.loginModal.open()
    }
  },
  validations: {
    form: {
      username: {
        required,
        minLength: minLength(6)
      },
      password: {
        required,
        minLength: minLength(8)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-modal {
  width: 320px;

  &-logo {
    display: flex;
    align-items: center;
    justify-content: center;
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

  &__title {
    font-weight: bold;
    font-size: 24px;
    text-align: center;
    margin-top: 40px;
  }

  &__subtitle {
    margin-top: 12px;
    font-size: 14px;
    line-height: 20px;
    color: #9FA2B4;
    text-align: center;
  }

  &__input {
    margin-top: 24px;
  }
}
</style>
