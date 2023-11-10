<template>
  <main class="registration">
    <section class="container">
      <form @submit.prevent="onRegister">
        <h3>Регистрация предприятия</h3>
        <h3
          class="registration__secondary-title registration__secondary-title-1"
        >
          1. Основные данные о предприятии
        </h3>
        <div class="registration-row">
          <p class="registration-row__label">
            Организационно-правовая форма <span>*</span>
          </p>
          <div>
            <BaseSelect
              v-model="form.OrganizationalAndLegalForm"
              :options="options.organizationForms"
            />
            <BaseError
              v-if="
                v$.form.$dirty &&
                v$.form.OrganizationalAndLegalForm.required.$invalid
              "
              >Обязательное поле</BaseError
            >
          </div>
        </div>
        <div class="registration-row">
          <p class="registration-row__label">Название предприятия *</p>
          <BaseInput v-model.trim="form.companyName">
            <BaseError
              v-if="v$.form.$dirty && v$.form.companyName.required.$invalid"
              >Обязательное поле</BaseError
            >
            <BaseError
              v-else-if="
                v$.form.$dirty && v$.form.companyName.minLength.$invalid
              "
              >Минимальное количество символов 3</BaseError
            >
          </BaseInput>
        </div>
        <div class="registration-row">
          <p class="registration-row__label">Адрес *</p>
          <div>
            <BaseButton type="button" @click="$refs.setPick.open()">
              Выбрать на карте
            </BaseButton>
            <BaseError
              v-if="v$.form.$dirty && v$.form.coordinates.required.$invalid"
              style="margin-top: 8px"
              >Обязательное поле</BaseError
            >
          </div>
        </div>
        <div class="registration-row">
          <p class="registration-row__label">ИНН *</p>
          <BaseInput v-model.trim="form.inn" v-maska="'#*'">
            <BaseError v-if="v$.form.$dirty && v$.form.inn.required.$invalid"
              >Обязательное поле</BaseError
            >
          </BaseInput>
        </div>
        <div class="registration-row">
          <p class="registration-row__label">Муниципальное образование *</p>
          <div>
            <BaseSelect
              v-model="form.municipality"
              :options="options.municipals"
            />
            <BaseError
              v-if="v$.form.$dirty && v$.form.municipality.required.$invalid"
              style="margin-top: 8px"
              >Обязательное поле</BaseError
            >
          </div>
        </div>
        <div class="registration-row">
          <p class="registration-row__label">Отрасль *</p>
          <div>
            <BaseSelect v-model="form.industry" :options="options.industries" />
            <BaseError
              v-if="v$.form.$dirty && v$.form.industry.required.$invalid"
              style="margin-top: 8px"
              >Обязательное поле</BaseError
            >
          </div>
        </div>
        <div class="registration-row">
          <p class="registration-row__label">Вид деятельности *</p>
          <div>
            <BaseButton @click="$refs.tree.open()">
              ОКВЭД2
              <span class="registration__burger"></span>
            </BaseButton>
          </div>
        </div>
        <div class="registration-row">
          <p class="registration-row__label">Общая численность сотрудников *</p>
          <BaseInput v-model.trim="form.totalEmployees" v-maska="'#*'">
            <BaseError
              v-if="v$.form.$dirty && v$.form.totalEmployees.required.$invalid"
              >Обязательное поле</BaseError
            >
          </BaseInput>
        </div>
        <div class="registration-row">
          <span />
          <BaseCheckbox
            v-model="form.military"
            label="Является предприятием оборонно-промышленного комплекса"
          />
        </div>
        <div class="registration-row">
          <span />
          <BaseCheckbox v-model="form.backbone" label="Системообразующее" />
        </div>

        <h3
          class="registration__secondary-title registration__secondary-title-2"
        >
          2. Контактная информация предприятия
        </h3>
        <p class="registration__secondary-subtitle-2">
          Данные доступны только администрации Портала
        </p>
        <div class="registration-row">
          <p class="registration-row__label">ФИО ответственного *</p>
          <BaseInput v-model.trim="form.fio">
            <BaseError v-if="v$.form.$dirty && v$.form.fio.required.$invalid"
              >Обязательное поле</BaseError
            >
          </BaseInput>
        </div>
        <div class="registration-row">
          <p class="registration-row__label">Телефон *</p>
          <BaseInput
            v-model.trim="form.phone"
            v-maska="['###-###', '+7 (###) ###-##-##']"
          >
            <BaseError v-if="v$.form.$dirty && v$.form.phone.required.$invalid"
              >Обязательное поле</BaseError
            >
          </BaseInput>
        </div>
        <div class="registration-row">
          <p class="registration-row__label">E-mail *</p>
          <BaseInput v-model.trim="form.email">
            <BaseError v-if="v$.form.$dirty && v$.form.email.required.$invalid"
              >Обязательное поле</BaseError
            >
            <BaseError
              v-else-if="v$.form.$dirty && v$.form.email.email.$invalid"
              >Введите корректную почту</BaseError
            >
          </BaseInput>
        </div>

        <h3
          class="registration__secondary-title registration__secondary-title-3"
        >
          3. Данные для создания учётной записи на Портале
        </h3>
        <div class="registration-row">
          <p class="registration-row__label">Логин *</p>
          <BaseInput v-model.trim="form.login">
            <BaseError v-if="v$.form.$dirty && v$.form.login.required.$invalid"
              >Обязательное поле</BaseError
            >
            <BaseError v-if="v$.form.$dirty && v$.form.login.minLength.$invalid"
              >Минимальное количество символов 8</BaseError
            >
            <BaseError v-else-if="v$.form.$dirty && formUniq.login"
              >Предприятие с таким логином уже существует</BaseError
            >
          </BaseInput>
        </div>
        <div class="registration-row">
          <p class="registration-row__label">Пароль *</p>
          <BaseInput :type="'password'" v-model="form.password">
            <BaseError
              v-if="v$.form.$dirty && v$.form.password.required.$invalid"
              >Обязательное поле</BaseError
            >
            <BaseError
              v-if="v$.form.$dirty && v$.form.password.minLength.$invalid"
              >Минимальное количество символов 8</BaseError
            >
          </BaseInput>
        </div>
        <div class="registration-row">
          <p class="registration-row__label">Подтверждение пароля *</p>
          <BaseInput :type="'password'" v-model="form.passwordAgain">
            <BaseError
              v-if="v$.form.$dirty && v$.form.passwordAgain.required.$invalid"
              >Обязательное поле</BaseError
            >
            <BaseError
              v-else-if="
                v$.form.$dirty && v$.form.passwordAgain.sameAs.$invalid
              "
              >Пароли не совпадают</BaseError
            >
          </BaseInput>
        </div>
        <div class="registration-row">
          <span />
          <BaseCheckbox
            v-model="form.privacy"
            label="* Даю согласие на обработку персональных данных (Статья 9 152-ФЗ)"
          />
        </div>
        <div class="registration-row">
          <span />
          <BaseCheckbox
            v-model="form.spread"
            label="* Даю согласие на распространение предоставленных персональных данных, (Статья 8 152-ФЗ, Статья 10.1 152-ФЗ, Приказ Роскомнадзора от 24.02.2021 №18 – вступает в силу с 1 сентября 2021 г.)"
          />
        </div>
        <div class="registration-row">
          <span />
          <BaseCheckbox
            v-model="form.termsOfOffer"
            label="* Я принимаю условия оферты"
          />
        </div>

        <div class="registration__panel">
          <div>
            <BaseButton size="elg" square type="submit">
              Зарегистрироваться
            </BaseButton>
            <BaseError
              style="margin-top: 10px"
              v-if="v$.form.$dirty && v$.form.$invalid"
              >Некоторые поля заполнены неверно</BaseError
            >
          </div>
        </div>
      </form>
    </section>

    <AppModal ref="setPick">
      <SetPosition
        style="width: 800px"
        :address="form.address"
        @set="onChoosePosition"
        @ok="$refs.setPick.close()"
      />
    </AppModal>

    <AppModal ref="tree" style="width: 700px; height: 80vh">
      <h3 style="margin-bottom: 30px">ОКВЭД2</h3>
      <TreeCheckbox
        v-for="(i, index) of tree"
        :key="index"
        v-model="i.value"
        :tree="i.options"
      />
    </AppModal>
  </main>
</template>

<script>
import axios from 'axios'

import useVuelidate from '@vuelidate/core'
import { required, minLength, email, sameAs } from '@vuelidate/validators'
import { mapGetters } from 'vuex'

import BaseError from '@/components/Base/BaseError'
import BaseSelect from '@/components/Base/BaseSelect'
import BaseInput from '@/components/Base/BaseInput'
import BaseCheckbox from '@/components/Base/BaseCheckbox'
import BaseButton from '@/components/Base/BaseButton'
import SetPosition from '@/components/SetPosition'
import AppModal from '@/components/AppModal'
import TreeCheckbox from '@/components/TreeCheckbox'

export default {
  name: 'PageCompanyRegistration',
  components: {
    TreeCheckbox,
    AppModal,
    SetPosition,
    BaseError,
    BaseButton,
    BaseCheckbox,
    BaseInput,
    BaseSelect
  },
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      form: {
        OrganizationalAndLegalForm: null,
        companyName: '',
        address: '',
        coordinates: [],
        inn: '',
        municipality: null,
        industry: null,
        totalEmployees: '',
        fio: '',
        phone: '',
        email: '',
        login: '',
        password: '',
        passwordAgain: '',
        military: false,
        backbone: false,
        privacy: true,
        spread: true,
        termsOfOffer: true
      },
      options: {
        municipals: [],
        industries: [],
        organizationForms: []
      },
      tree: [],
      formUniq: {
        login: false
      }
    }
  },
  async created() {
    await this.fetchOptions()
    await this.fetchTree()
  },
  methods: {
    async fetchTree() {
      const res = await this.$api.activities.list()
      const data = res.data.comments ?? []

      this.tree = data.map((i) => {
        return {
          value: [],
          options: i
        }
      })
    },
    resetTree() {
      for (const item of this.tree) {
        item.value = []
      }
    },
    async fetchOptions() {
      try {
        const res = await this.$api.municipals.list()
        const options = res.data ?? []
        const computed = options.map((i) => ({ value: i.id, text: i.name }))
        computed.unshift({ value: null, text: 'Выбрать', disabled: true })
        this.options.municipals = computed
      } catch (e) {
        console.log(e)
      }

      try {
        const res = await this.$api.industries.list()
        const options = res.data ?? []
        const computed = options.map((i) => ({ value: i.id, text: i.name }))
        computed.unshift({ value: null, text: 'Выбрать', disabled: true })
        this.options.industries = computed
      } catch (e) {
        console.log(e)
      }

      try {
        const res = await this.$api.organizationForms.list()
        const options = res.data ?? []
        const computed = options.map((i) => ({ value: i.id, text: i.name }))
        computed.unshift({ value: null, text: 'Выбрать', disabled: true })
        this.options.organizationForms = computed
      } catch (e) {
        console.log(e)
      }
    },

    async onRegister() {
      if (this.v$.form.$invalid) {
        this.v$.form.$touch()
        return
      }
      try {
        await this.$api.request.create({
          name: this.form.companyName,
          address: this.form.address,
          coordinates: this.form.coordinates.join(','),
          INN: this.form.inn,
          employees: this.form.totalEmployees,
          responsible: this.form.fio,
          telephone: this.form.phone,
          email: this.form.email,
          login: this.form.login,
          password: this.form.password,
          is_backbone: this.form.backbone,
          is_military_industrial: this.form.military,
          organization_form: this.form.OrganizationalAndLegalForm,
          municipal: this.form.municipality,
          industry: this.form.industry,
          activities: this.getSelectedIDs
        })

        setImmediate(() => {
          this.form = {
            OrganizationalAndLegalForm: null,
            companyName: '',
            address: '',
            coordinates: [],
            inn: '',
            municipality: null,
            industry: null,
            totalEmployees: '',
            fio: '',
            phone: '',
            email: '',
            login: '',
            password: '',
            passwordAgain: '',
            military: false,
            backbone: false,
            privacy: true,
            spread: true,
            termsOfOffer: true
          }
          this.resetTree()
          this.v$.form.$reset()
          alert('Заявка на регистрацию подана')
        })
      } catch (e) {
        const data = e.response.data
        if (e.response.status === 400) {
          this.formUniq = {
            login: data.login ?? false
          }
          this.v$.form.$touch()
        }
      }
    },
    async onChoosePosition(event) {
      const res = await axios.get('https://geocode-maps.yandex.ru/1.x/', {
        params: {
          apikey: '8ec221f0-712c-467a-847e-d85ffe111e7a',
          geocode: event.join(','),
          format: 'json',
          results: 1
        }
      })

      this.form.coordinates = event
      this.form.address =
        res.data.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.text
    }
  },
  computed: {
    ...mapGetters(['getSelectedIDs'])
  },
  validations() {
    return {
      form: {
        OrganizationalAndLegalForm: {
          required
        },
        companyName: {
          required,
          minLength: minLength(3)
        },
        coordinates: {
          required
        },
        inn: {
          required
        },
        municipality: {
          required
        },
        industry: {
          required
        },
        totalEmployees: {
          required
        },
        fio: {
          required
        },
        phone: {
          required
        },
        email: {
          required,
          email
        },
        login: {
          required,
          minLength: minLength(8)
        },
        password: {
          required,
          minLength: minLength(8)
        },
        passwordAgain: {
          required,
          sameAs: sameAs(this.form.password)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.registration {
  padding: 50px 0 80px;

  &__burger {
    position: relative;
    margin-left: 15px;
    width: 20px;
    height: 2px;
    background-color: #fff;
    &:before {
      content: '';
      position: absolute;
      top: -6px;
      left: 0;
      width: 20px;
      height: 2px;
      background-color: #fff;
    }
    &:after {
      content: '';
      position: absolute;
      top: 6px;
      left: 0;
      width: 20px;
      height: 2px;
      background-color: #fff;
    }
  }

  &__secondary-title {
    &-1 {
      margin-top: 30px;
    }
    &-2 {
      margin-top: 60px;
    }
    &-3 {
      margin-top: 60px;
    }
  }

  &__secondary-subtitle {
    &-2 {
      margin-top: 25px;
      font-weight: 600;
    }
  }

  &-row {
    display: grid;
    grid-template-columns: 420px 1fr;
    grid-column-gap: 20px;
    align-items: center;
    margin-top: 20px;

    &__logo {
      width: 178px;
      &-button:active {
        pointer-events: none;
      }
      &-input {
        position: absolute;
        top: -100%;
        visibility: hidden;
        pointer-events: none;
      }
    }

    &__label {
      font-weight: 600;
      font-size: 21px;
      text-align: right;
    }
  }

  &__panel {
    margin-top: 40px;
    display: flex;
    justify-content: center;
  }
}
</style>
