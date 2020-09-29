<template>
  <div>
    <BaseTitle title="Chart management" :hasBackButton="false" />

    <BaseCard title="Charts" v-if="charts"
      ><template #actions>
        <router-link :to="{ name: 'chart-edit' }" class="button is-primary">
          Add new chart
        </router-link>
      </template>

      <BaseTable :data="charts.results" :columns="columns" />
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
      columns: [
        {
          name: 'name',
          sortable: true,
          display_name: 'Chart name'
        },
        {
          name: 'creation_date',
          field_type: 'date',
          display_name: 'Creation date'
        },
        {
          name: 'config.table',
          display_name: 'Tables',
          component: 'FieldTagList',
          props: {
            name: 'table'
          }
        },
        {
          name: 'owner.username',
          display_name: 'Created by'
        },
        {
          name: 'config.table',
          display_name: 'Show in dashboard',
          component: 'FieldCheckbox',
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
  }
}
</script>
