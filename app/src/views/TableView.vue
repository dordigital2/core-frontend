<template>
  <div v-if="table">
    <BaseTitle :title="title" />

    <BaseCard title="Filtering">
      <template #actions>
        <div class="buttons">
          <button class="button is-light">Reset filters</button>
          <button class="button is-dark">Add filters</button>
        </div>
      </template>

      <div class="card-container">
        @TODO: No filters yet
      </div>
    </BaseCard>

    <BaseCard
      v-if="tableEntries"
      :title="
        `${title} <span class='entries'>${tableEntries.count} entries</span>`
      "
    >
      <template #actions>
        <button class="button is-dark" @click="openModalColumns">
          Change view
        </button>
      </template>

      <div class="card-container">
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

      <BaseTable
        :data="tableEntries.results"
        :columns="tableColumns"
        :pagination="pagination"
      />
    </BaseCard>
  </div>
</template>

<script>
import ModalColumns from '@/components/modals/ModalColumns'
import { mapState } from 'vuex'

export default {
  name: 'TableView',
  components: {},
  data() {
    return {
      pagination: {
        paginated: true,
        perPage: 5
      }
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
    tableColumns() {
      if (this.table.fields == null) return

      let fields = this.table.fields.slice()

      const selectedFields = this.$route.query.__fields
      if (selectedFields != null) {
        selectedFields.split(',')
        fields = fields.filter(e => selectedFields.indexOf(e.name) != -1)
      }

      console.log(fields, selectedFields)

      fields.push({
        name: 'actions',
        custom_class: 'actions',
        component: 'ActionsTable',
        display_name: ' ',
        sticky: true
      })

      return fields
    }
  },
  mounted() {
    this.$store
      .dispatch('data/getTable', this.$route.params.idTable)
      .then(() => {
        this.pagination.total = this.table.entries_count
      })

    this.$store.dispatch('data/getTableEntries', this.$route.params.idTable)
  },
  methods: {
    openModalColumns() {
      this.$buefy.modal.open({
        parent: this,
        component: ModalColumns,
        hasModalCard: true,
        trapFocus: true,
        props: {
          table: this.table
        }
      })
    }
  }
}
</script>
