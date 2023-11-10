<template>
  <div>
    <div class="search-partners">
      <div class="container">
        <h2>Поиск партнеров</h2>

        <div class="search-panel">
          <BaseButton @click="$refs.treeEl.open()">ОКВЭД2</BaseButton>
          <BaseInput
            v-model.lazy="searchRow"
            class="search-panel__search-row"
            @enter="fetchCompanies"
          />
          <BaseButton @click="onReset"> Сбросить все </BaseButton>
        </div>

        <div class="main">
          <div class="filter main__item">
            <div class="filter-panel">
              <p class="filter-panel__title">Отрасль</p>
              <button
                class="filter-panel__reset-btn"
                @click="onResetSelectedIndustries"
              >
                сбросить
              </button>
            </div>

            <div class="filter-industries">
              <BaseCheckbox
                v-for="item of industries"
                :key="item.id"
                v-model="selectedIndustries"
                :value="item.id"
                :label="item.name"
              />
            </div>
          </div>

          <div class="partners main__item">
            <div class="partners__panel">
              <div class="sort">
                <template v-if="view.current === 1">
                  <div class="sort__item">Сортировать по:</div>
                  <div
                    v-for="item of sort.options"
                    :key="item.value"
                    class="sort__item"
                    :class="{ sort__item_active: item.value === sort.current }"
                    @click="onSort(item)"
                  >
                    {{ item.text }}
                  </div>
                </template>
              </div>

              <div class="view">
                <div
                  v-for="item of view.options"
                  :key="item.value"
                  class="view__item"
                  :class="{ view__item_active: item.value === view.current }"
                  @click="view.current = item.value"
                >
                  {{ item.text }}
                </div>
              </div>
            </div>

            <MapCompanies
              v-if="view.current === 0"
              :companies="companiesForMap"
            />
            <template v-else-if="view.current === 1" class="partners-list">
              <table v-if="companies !== []" class="partners__table">
                <!-- <CardPartner
                  v-for="company of companies"
                  :key="company.id"
                  :title="company.name"
                  :industry="company.industry"
                  :date="company.created_at"
                  :address="company.address"
                /> -->
                <tr>
                  <th>Наименование</th>
                  <th>Отрасль</th>
                  <th>Адрес</th>
                  <th>Организационно-правовая форма</th>
                  <th>Муниципальное образование</th>
                  <th>Вид деятельности</th>
                  <th>Продукция</th>
                </tr>
                <tr v-for="company of companies" :key="company.id">
                  <td>
                    {{ company.name }}
                  </td>
                  <td>
                    {{ company.industry }}
                  </td>
                  <td>
                    {{ company.address }}
                  </td>
                  <td>
                    {{ company.organization_form }}
                  </td>
                  <td>
                    {{ company.municipal }}
                  </td>
                  <td>
                    {{ company.address }}
                  </td>
                  <td>
                    <BaseButton style="margin-bottom: 5px" size="mini"
                      >Предприятие</BaseButton
                    >
                  </td>
                </tr>
              </table>

              <div
                v-if="companies !== []"
                class="partners-list__pagination-wrapper"
              >
                <BasePagination v-model="currentPage" :pageCount="totalPages" />
              </div>
              <div v-else class="partners-list__text">
                Такой компании не существует
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <AppModal ref="treeEl" style="width: 700px; height: 80vh">
      <h3 style="margin-bottom: 30px">ОКВЭД2</h3>
      <BaseButton style="margin-bottom: 20px" @click="onApplyTree">
        Применить
      </BaseButton>

      <TreeCheckbox
        v-for="(i, index) of tree"
        :key="index"
        v-model="i.value"
        :tree="i.options"
      />
    </AppModal>
  </div>
</template>

<script>
import useIndustryTree from '@/composables/useIndustryTree'

import BasePagination from '@/components/Base/BasePagination'
import BaseButton from '@/components/Base/BaseButton'
import BaseInput from '@/components/Base/BaseInput'
import BaseCheckbox from '@/components/Base/BaseCheckbox'
import AppModal from '@/components/AppModal'
import MapCompanies from '@/components/CleverComponents/MapCompanies'
import TreeCheckbox from '@/components/TreeCheckbox'
// import CardPartner from '@/components/CardPartner'

export default {
  name: 'PageSearchPartners',
  components: {
    MapCompanies,
    BasePagination,
    BaseCheckbox,
    AppModal,
    BaseButton,
    BaseInput,
    TreeCheckbox
    // CardPartner
  },
  setup() {
    const { tree, fetchTree, selectedItems } = useIndustryTree()

    return {
      tree,
      fetchTree,
      selectedTreeItems: selectedItems
    }
  },
  data() {
    return {
      companies: [],
      currentPage: 1,
      totalPages: 1,
      industries: [],
      selectedIndustries: [],
      searchRow: '',
      view: {
        current: 1,
        options: [
          { value: 0, text: 'Карты', pageSize: undefined },
          { value: 1, text: 'Список', pageSize: 10 }
        ]
      },
      sort: {
        current: 'name',
        direction: 'ASC',
        options: [
          { value: 'name', text: 'Наименование' },
          { value: 'municipal', text: 'Городской округ' }
        ]
      }
    }
  },
  computed: {
    pageSize() {
      return this.view.options.find((i) => i.value === this.view.current)
        .pageSize
    },
    companiesForMap() {
      return this.companies.map((item) => ({
        coords: item.coordinates.split(','),
        html: `
            <div>
                <p>Наименование: ${item.name}</p>
                <p>Сектор: ${item.industry}</p>
                <p>На портале с ${item.created_at}</p>
                <p>Адрес: ${item.address}</p>
            </div>
          `
      }))
    }
  },
  watch: {
    searchRow: 'resetAndFetchCompanies',
    currentPage: 'fetchCompanies',
    'view.current': 'resetAndFetchCompanies',
    selectedIndustries: 'resetAndFetchCompanies'
  },
  async created() {
    await this.fetchIndustries()
    await this.fetchCompanies()
    await this.fetchTree()
  },
  methods: {
    async fetchCompanies() {
      try {
        const body = {
          pageSize: this.pageSize,
          pageIndex: this.currentPage,
          search: {
            name: this.searchRow,
            industries: this.selectedIndustries,
            activities: this.selectedTreeItems
          },
          sort: {
            key: this.sort.current,
            order: this.sort.direction
          }
        }

        const res = await this.$api.companies.list(body)
        this.companies = res.data.companies ?? []
        console.log(this.companies)
        this.totalPages = res.data?.pages ?? 1
      } catch (e) {
        console.log(e)
      }
    },
    async fetchIndustries() {
      try {
        const res = await this.$api.industries.list()
        this.industries = res.data ?? []
      } catch (e) {
        console.log(e)
      }
    },
    resetTree() {
      for (const item of this.tree) {
        item.value = []
      }
    },
    onResetSelectedIndustries() {
      this.selectedIndustries = []
    },
    onReset() {
      this.resetTree()
      this.selectedIndustries = []
      this.searchRow = ''
      this.currentPage = 1
    },
    async onSort(item) {
      if (this.sort.current === item.value) {
        this.sort.direction = this.sort.direction === 'ASC' ? 'DESC' : 'ASC'
      } else {
        this.sort.current = item.value
        this.sort.direction = 'ASC'
      }

      await this.resetAndFetchCompanies()
    },
    async resetAndFetchCompanies() {
      this.currentPage = 1
      await this.fetchCompanies()
    },
    async onApplyTree() {
      this.$refs.treeEl.close()
      await this.resetAndFetchCompanies()
    }
  }
}
</script>

<style lang="scss" scoped>
.search-partners {
  padding: 50px 0;

  .search-panel {
    margin-top: 40px;
    display: flex;

    &__search-row {
      margin: 0 16px;
      flex-grow: 1;
    }
  }

  .main {
    margin-top: 70px;
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-column-gap: 20px;

    &__item > div:first-child {
      margin-bottom: 30px;
    }

    .filter {
      &-panel {
        display: flex;

        &__title {
          font-weight: 600;
          font-size: 21px;
        }
        &__reset-btn {
          margin-left: 50px;
          background: none;
          border: none;
          font-weight: 500;
          font-size: 16px;
          color: #848b9a;

          &:hover {
            cursor: pointer;
          }
        }
      }

      &-industries {
        height: 400px;
        overflow: auto;
      }
    }

    .partners {
      @mixin item {
        font-weight: 500;
        font-size: 16px;
        color: #848b9a;
        user-select: none;
        cursor: pointer;

        &:not(:first-child) {
          margin-left: 24px;
        }

        &_active {
          color: #000;
        }
      }

      &__table {
        margin-top: 40px;

        th {
          font-size: 14px;
        }
        td {
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &,
        th,
        td {
          padding: 5px;
          border: 1px solid #c4cad1;
          border-collapse: collapse;
        }
      }

      &__panel {
        display: flex;
        justify-content: space-between;

        .sort {
          display: flex;

          &__item {
            @include item;
          }
        }

        .view {
          display: flex;

          &__item {
            @include item;
          }
        }
      }

      &-list {
        &__pagination-wrapper {
          margin-top: 70px;
          display: flex;
          justify-content: center;
        }
        &__text {
          font-size: 18px;
          text-align: center;
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
