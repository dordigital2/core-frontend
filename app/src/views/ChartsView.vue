<template>
  <div>
    <BaseTitle title="Chart management" :hasBackButton="false" />

    <BaseCard title="Charts" v-if="charts"
      ><template #actions>
        <router-link :to="{ name: 'chart-edit' }" class="button is-primary">
          Add new chart
        </router-link>
      </template>

      <BaseTableAsync
        :table="table"
        :tableEntries="charts"
        tableActionsComponent="ActionsCharts"
        @update="getCharts"
      />
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
      table: {
        id: 'charts',
        default_fields: [
          'name',
          'creation_date',
          'table',
          'owner.username',
          'show_dashboard'
        ],
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
            sortable: false,
            props: {
              type: 'charts',
              action: 'add-to-dashboard'
            }
          }
        ]
      }
    }
  },
  computed: mapState({
    charts: state => state.data.charts
  }),
  mounted() {
    this.getCharts()
  },
  methods: {
    getCharts(query) {
      this.$store.dispatch('data/getCharts', query)
    }
  }
}
</script>
