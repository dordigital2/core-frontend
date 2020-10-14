<template>
  <div v-if="database">
    <BaseTitle title="Manage database" :hasBackButton="false" />

    <BaseCard title="Active tables"
      ><template #actions>
        <router-link :to="{ name: 'table-add' }" class="button is-primary">
          Add new table
        </router-link>
      </template>

      <BaseTable
        :data="database.active_tables"
        :fields="fields.active_tables"
      />
    </BaseCard>

    <BaseCard title="Archived tables">
      <BaseTable
        :data="database.archived_tables"
        :fields="fields.archived_tables"
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
      fields: {
        active_tables: [
          {
            name: 'name',
            component: 'FieldRouterLink',
            props: { route: 'table-view', param: 'idTable' },
            display_name: 'Table name'
          },
          {
            name: 'last_edit_date',
            field_type: 'datetime',
            display_name: 'Last edit'
          },
          {
            name: 'entries',
            display_name: 'Entries'
          },
          {
            name: 'last_edit_user.username',
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
            component: 'FieldRouterLink',
            props: { route: 'table-view', param: 'idTable' },
            display_name: 'Table name'
          },
          {
            name: 'last_edit_date',
            field_type: 'datetime',
            display_name: 'Archiving date'
          },
          {
            name: 'entries',
            display_name: 'Entries'
          },
          {
            name: 'owner.username',
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
