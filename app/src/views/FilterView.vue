<template>
  <div>
    <BaseTitle title="Filtered views" :hasBackButton="false" />

    <BaseCard title="Views" v-if="tableViews"
      ><template #actions>
        <router-link :to="{ name: 'filter-edit' }" class="button is-primary">
          Add new view
        </router-link>
      </template>

      <BaseTableAsync
        :table="table"
        :tableEntries="tableViews"
        tableActionsComponent="ActionsTableView"
        @update="getViews"
      />
    </BaseCard>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FilterView',
  components: {},
  data() {
    return {
      table: {
        id: 'views',
        default_fields: [
          'name',
          'creation_date',
          'tables',
          'owner.username',
          'show_dashboard'
        ],
        fields: [
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
            name: 'show_dashboard',
            display_name: 'Show in dashboard',
            component: 'FieldCheckbox',
            centered: true,
            sortable: false,
            props: {
              type: 'filters',
              action: 'add-to-dashboard'
            }
          }
        ]
      }
    }
  },
  computed: mapState({
    tableViews: state => state.data.tableViews
  }),
  mounted() {
    this.$store.commit('data/setTableView', null)
    this.getViews()
  },
  methods: {
    getViews(query) {
      this.$store.dispatch('data/getTableViews', { query })
    }
  }
}
</script>
