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

    <BaseCard :title="titleWithCount">
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

      <BaseTableAsync :idTable="table.id" />
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
      count: null,
      idTable: Number(this.$route.params.idTable)
    }
  },
  computed: {
    ...mapState({
      table: function(state) {
        return state.data.table[this.idTable]
      },
      tableEntries: function(state) {
        return state.data.tableEntries[this.idTable]
      }
    }),
    title() {
      return 'Table – ' + this.table.name
    },
    titleWithCount() {
      return (
        this.title +
        (this.tableEntries
          ? ` <span class='entries'>${this.tableEntries.count} entries</span>`
          : '')
      )
    }
  },
  mounted() {
    this.$store.dispatch('data/getTable', this.idTable)
    // this.$store.dispatch('data/getTableEntries', { idTable: this.idTable })
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
