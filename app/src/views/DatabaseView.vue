<template>
  <div v-if="database">
    <BaseTitle title="Manage database" :hasBackButton="false" />

    <BaseCard title="Active tables"
      ><template #actions v-if="$attrs.isEditable">
        <button class="button is-primary">
          Add a new table
        </button>
      </template>

      <BaseTable
        :data="database.active_tables"
        :columns="columns.active_tables"
      />
    </BaseCard>

    <BaseCard title="Archived tables">
      <BaseTable
        :data="database.archived_tables"
        :columns="columns.archived_tables"
      />
    </BaseCard>
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
            custom_class: 'actions',
            sticky: true
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
            component: 'FieldOwnerLink'
          },
          {
            name: 'actions',
            display_name: ' ',
            component: 'ActionsDatabaseArchived',
            custom_class: 'actions',
            sticky: true
          }
        ]
      }
    }
  },
  computed: mapState({
    database: state => state.data.database
  }),
  mounted() {
    this.$store.dispatch('data/getDatabase')
  }
}
</script>
