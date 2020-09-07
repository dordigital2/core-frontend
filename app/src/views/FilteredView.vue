<template>
  <div v-if="database">
    <BaseTitle title="Manage database" :hasBackButton="false" />

    <BaseCard title="Active tables"
      ><template #actions>
        <router-link :to="{ name: 'table-add' }" class="button is-primary">
          Add a new table
        </router-link>
      </template>

      <BaseTable :data="database.active_tables" :columns="columns" />
    </BaseCard>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FilteredView',
  components: {},
  data() {
    return {
      columns: {
        active_tables: [
          {
            name: 'name',
            sortable: true,
            display_name: 'Table name'
          },
          {
            name: 'last_edit_date',
            sortable: true,
            field_type: 'date',
            display_name: 'Last edit'
          },
          {
            name: 'entries',
            sortable: true,
            display_name: 'Entries'
          },
          {
            name: 'last_edit_user.username',
            sortable: true,
            display_name: 'Last edit made by'
          },
          {
            name: 'actions',
            display_name: ' ',
            component: 'ActionsDatabaseActive',
            custom_class: 'actions',
            sticky: true
          }
        ]
      }
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
