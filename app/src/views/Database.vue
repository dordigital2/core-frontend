<template>
  <div v-if="database != null">
    <header>
      <p class="title">View Database</p>
    </header>

    <div class="box">
      <div class="title is-spaced">Database: {{ database.name }}</div>

      <b-table
        :data="database.active_tables"
        :columns="columns.active_tables"
      ></b-table>
    </div>

    <div class="box">
      <div class="title is-spaced">Archived tables</div>

      <b-table
        :data="database.archived_tables"
        :columns="columns.archived_tables"
      >
        <b-table-column field="name" label="Actions">
          <b-icon icon="eye-outline"/> x
        </b-table-column>
      </b-table>
    </div>
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
            label: 'Table name'
          },
          {
            field: 'last_edit_date',
            label: 'Last edit'
          },
          {
            field: 'entries',
            label: 'Entries'
          },
          {
            field: 'owner.username',
            label: 'Last edit made by'
          }
        ],
        archived_tables: [
          {
            field: 'name',
            label: 'Table name'
          },
          {
            field: 'last_edit_date',
            label: 'Archiving date'
          },
          {
            field: 'entries',
            label: 'Entries'
          },
          {
            field: 'owner.username',
            label: 'Archived by'
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
