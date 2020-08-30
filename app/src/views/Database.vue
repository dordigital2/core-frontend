<template>
  <div v-if="database != null">
    <BaseTitle title="View database" :hasBackButton="false" />

    <CardTable
      title="Active tables"
      :data="database.active_tables"
      :columns="columns.active_tables"
    />

    <CardTable
      title="Archived tables"
      :data="database.archived_tables"
      :columns="columns.archived_tables"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Database',
  data() {
    return {
      columns: {
        active_tables: [
          {
            field: 'name',
            sortable: true,
            label: 'Table name'
          },
          {
            field: 'last_edit_date',
            sortable: true,
            label: 'Last edit'
          },
          {
            field: 'entries',
            sortable: true,
            label: 'Entries'
          },
          {
            field: 'owner.username',
            sortable: true,
            label: 'Last edit made by'
          },
          {
            field: 'actions',
            component: 'ActionsDatabaseActive',
            cellClass: 'actions'
          }
        ],
        archived_tables: [
          {
            field: 'name',
            sortable: true,
            label: 'Table name'
          },
          {
            field: 'last_edit_date',
            sortable: true,
            filter: 'parseDate',
            label: 'Archiving date'
          },
          {
            field: 'entries',
            sortable: true,
            label: 'Entries'
          },
          {
            field: 'owner.username',
            sortable: true,
            label: 'Archived by',
            component: 'OwnerLink'
          },
          {
            field: 'actions',
            component: 'ActionsDatabaseArchived',
            cellClass: 'actions'
          }
        ]
      }
    }
  },
  computed: mapState({
    database: state => state.database.database[0]
  }),
  mounted() {
    this.$store.dispatch('database/get')
  }
}
</script>
