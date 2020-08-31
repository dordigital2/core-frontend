<template>
  <div v-if="database != null">
    <BaseTitle title="Manage database" :hasBackButton="false" />

    <Card title="Active tables"
      ><template #actions v-if="$attrs.isEditable">
        <button class="button is-primary">
          Add a new table
        </button>
      </template>

      <VTable :data="database.active_tables" :columns="columns.active_tables" />
    </Card>

    <Card title="Archived tables">
      <VTable
        :data="database.archived_tables"
        :columns="columns.archived_tables"
      />
    </Card>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'DatabaseView',
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
            custom_class: 'actions'
          }
        ],
        archived_tables: [
          {
            name: 'name',
            sortable: true,
            display_name: 'Table name'
          },
          {
            name: 'last_edit_date',
            sortable: true,
            field_type: 'date',
            display_name: 'Archiving date'
          },
          {
            name: 'entries',
            sortable: true,
            display_name: 'Entries'
          },
          {
            name: 'owner.username',
            sortable: true,
            display_name: 'Archived by',
            component: 'OwnerLink'
          },
          {
            name: 'actions',
            display_name: ' ',
            component: 'ActionsDatabaseArchived',
            custom_class: 'actions'
          }
        ]
      }
    }
  },
  computed: mapState({
    database: state => state.data.database[0]
  }),
  mounted() {
    this.$store.dispatch('data/getDatabase')
  }
}
</script>
