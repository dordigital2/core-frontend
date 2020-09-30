<template>
  <div>
    <BaseTitle title="Filtered views" :hasBackButton="false" />

    <BaseCard title="Views" v-if="tableViews"
      ><template #actions>
        <router-link :to="{ name: 'filter-edit' }" class="button is-primary">
          Add new view
        </router-link>
      </template>

      <BaseTable :data="tableViews.results" :columns="columns" />
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
      columns: [
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
          name: 'show_dashboard',
          display_name: 'Show in dashboard',
          component: 'FieldCheckbox',
          centered: true,
          props: {
            type: 'filters',
            action: 'add-to-dashboard'
          }
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
  },
  computed: mapState({
    tableViews: state => state.data.tableViews
  }),
  mounted() {
    this.$store.dispatch('data/getTableViews')
  }
}
</script>
