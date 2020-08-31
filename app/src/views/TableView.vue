<template>
  <div>
    <BaseTitle :title="title" />

    <Card title="Filtering">
      <template #actions>
        <div class="buttons">
          <button class="button is-light">Reset filters</button>
          <button class="button is-dark">Add filters</button>
        </div>
      </template>

      <div class="info">
        No filters yet
      </div>
    </Card>

    <Card
      :title="
        `${title} <span class='entries'>${table.entries_count} entries</span>`
      "
    >
      <template #actions>
        <button class="button is-dark">Change view</button>
      </template>

      <div class="info">
        Last edit: {{ table.last_edit_date | parseDate }}
        <span v-if="table.last_edit_user"
          >by
          <router-link :to="`user-profile/${table.last_edit_user.id}`">{{
            table.last_edit_user.first_name +
              ' ' +
              table.last_edit_user.last_name
          }}</router-link></span
        >
      </div>

      <VTable
        :data="tableEntries.results"
        :columns="tableWithActions"
        :pagination="pagination"
      />
    </Card>
  </div>
</template>

<script>
// import ModalColumns from '@/components/modals/ModalColumns'
import { mapState } from 'vuex'

export default {
  name: 'TableView',
  components: {},
  data() {
    return {
      pagination: {}
    }
  },
  computed: {
    ...mapState({
      table: state => state.data.table,
      tableEntries: state => state.data.tableEntries
    }),
    title() {
      return 'Table – ' + this.table.name
    },
    tableWithActions() {
      if (this.table.fields == null) return

      const fields = this.table.fields.slice()

      fields.push({
        custom_class: 'actions',
        component: 'ActionsTable',
        display_name: ''
      })

      return fields
    }
  },
  mounted() {
    this.$store
      .dispatch('data/getTable', this.$route.params.idTable)
      .then(() => {
        this.pagination = {
          paginated: true,
          total: this.table.entries_count,
          perPage: 5
        }
      })

    // this.$buefy.modal.open({
    //   parent: this,
    //   component: ModalColumns,
    //   hasModalCard: true,
    //   trapFocus: true
    // })
  }
}
</script>
