<template>
  <div v-if="user">
    <BaseTitle title="Dashboard" :hasBackButton="false" />

    <div class="columns">
      <template v-for="(card, index) in user.dashboard.cards">
        <div
          class="column is-4-desktop is-3-widescreen"
          :key="index"
          @click="
            $router.push({ name: 'card-view', params: { idCard: card.id } })
          "
        >
          <BaseCardChart
            class="button"
            :data="cards[index]"
            :title="card.data.name"
          />
        </div>
      </template>
    </div>

    <BaseCard title="Selected charts"
      ><template #actions>
        <router-link :to="{ name: 'charts-view' }" class="button is-primary">
          See all
        </router-link>
      </template>

      <BaseTable :data="user.dashboard.charts" :fields="fields.charts" />
    </BaseCard>

    <BaseCard title="Selected views"
      ><template #actions>
        <router-link :to="{ name: 'filter-view' }" class="button is-primary">
          See all
        </router-link>
      </template>

      <BaseTable :data="user.dashboard.filters" :fields="fields.tableViews" />
    </BaseCard>
  </div>
</template>

<script>
import { FilterQuery } from '@/utils/helpers'
import { DataService } from '@/services/data'
import { mapState } from 'vuex'
import BaseCardChart from '@/components/charts/BaseCardChart'

export default {
  name: 'Dashboard',
  components: { BaseCardChart },
  data() {
    return {
      cards: [],
      fields: {
        charts: [
          {
            name: 'name',
            component: 'FieldRouterLink',
            props: { route: 'chart-view', param: 'idChart' },
            display_name: 'Chart name'
          },
          {
            name: 'creation_date',
            field_type: 'date',
            display_name: 'Creation date'
          },
          {
            name: 'table',
            display_name: 'Table',
            component: 'FieldTagList'
          },
          {
            name: 'owner.username',
            display_name: 'Created by'
          },
          {
            name: 'actions',
            display_name: ' ',
            component: 'ActionsCharts',
            custom_class: 'actions',
            sortable: false,
            sticky: true
          }
        ],
        tableViews: [
          {
            name: 'name',
            component: 'FieldRouterLink',
            props: { route: 'filter-table-view', param: 'idTable' },
            display_name: 'View name'
          },
          {
            name: 'creation_date',
            field_type: 'date',
            display_name: 'Creation date'
          },
          {
            name: 'tables',
            display_name: 'Tables',
            component: 'FieldTagList'
          },
          {
            name: 'owner.username',
            display_name: 'Created by'
          },
          {
            name: 'actions',
            display_name: ' ',
            component: 'ActionsTableView',
            custom_class: 'actions',
            sortable: false,
            sticky: true
          }
        ]
      }
    }
  },
  computed: mapState({
    user: state => state.user
  }),
  watch: {
    user() {
      this.getCards()
    }
  },
  mounted() {
    if (this.user) this.getCards()
  },
  methods: {
    getCards() {
      this.user.dashboard.cards.forEach((e, index) => {
        DataService.getInstanceData(
          'cards',
          e.id,
          e.data.filters && FilterQuery(e.data.filters)
        ).then(response => {
          this.$set(this.cards, index, response.value)
        })
      })
    }
  }
}
</script>
