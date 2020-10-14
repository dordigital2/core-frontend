<template>
  <div>
    <BaseTitle title="Dashboard" :hasBackButton="false" />

    <BaseCard title="Selected charts" v-if="user"
      ><template #actions>
        <router-link :to="{ name: 'charts-view' }" class="button is-primary">
          See all
        </router-link>
      </template>

      <BaseTable :data="user.dashboard.charts" :fields="fields.charts" />
    </BaseCard>

    <BaseCard title="Selected views" v-if="user"
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
import { mapState } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
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
            sticky: true
          }
        ]
      }
    }
  },
  computed: mapState({
    user: state => state.user
  }),
  mounted() {}
}
</script>
