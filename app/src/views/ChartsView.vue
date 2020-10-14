<template>
  <div>
    <BaseTitle title="Chart management" :hasBackButton="false" />

    <BaseCard title="Charts" v-if="charts"
      ><template #actions>
        <router-link :to="{ name: 'chart-edit' }" class="button is-primary">
          Add new chart
        </router-link>
      </template>

      <BaseTable :data="charts.results" :fields="fields" />
    </BaseCard>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ChartsView',
  components: {},
  data() {
    return {
      fields: [
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
          name: 'show_dashboard',
          display_name: 'Show in dashboard',
          component: 'FieldCheckbox',
          centered: true,
          props: {
            type: 'charts',
            action: 'add-to-dashboard'
          }
        },
        {
          name: 'actions',
          display_name: ' ',
          component: 'ActionsCharts',
          custom_class: 'actions',
          sticky: true
        }
      ]
    }
  },
  computed: mapState({
    charts: state => state.data.charts
  }),
  mounted() {
    if (!this.charts) this.$store.dispatch('data/getCharts')
    this.$store.commit('data/setChart', null)
  }
}
</script>
