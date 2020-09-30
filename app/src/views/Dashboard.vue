<template>
  <div>
    <BaseTitle title="Dashboard" :hasBackButton="false" />

    <BaseCard title="Selected charts"
      ><template #actions>
        <router-link :to="{ name: 'charts-view' }" class="button is-primary">
          See all
        </router-link>
      </template>

      <BaseTable :data="charts" :columns="columns.charts" />
    </BaseCard>

    <BaseCard title="Selected views"
      ><template #actions>
        <router-link :to="{ name: 'filter-view' }" class="button is-primary">
          See all
        </router-link>
      </template>

      <BaseTable :data="tableViews" :columns="columns.tableViews" />
    </BaseCard>
  </div>
</template>

<script>
import ApiService from '@/services/api'

export default {
  name: 'Dashboard',
  data() {
    return {
      charts: null,
      tableViews: null,
      columns: {
        charts: [
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
            name: 'table_list',
            display_name: 'Table',
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
            name: 'actions',
            display_name: ' ',
            component: 'ActionsCharts',
            custom_class: 'actions',
            sticky: true
          }
        ],
        tableViews: [
          {
            name: 'name',
            sortable: true,
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
            component: 'FieldTagList',
            props: {
              name: 'tables'
            }
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
            sticky: true
          }
        ]
      }
    }
  },
  mounted() {
    ApiService.get('user/').then(response => {
      this.charts = response.dashboard.charts
      this.tableViews = response.dashboard.filters
    })
  }
}
</script>
