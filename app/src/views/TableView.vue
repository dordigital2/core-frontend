<template>
  <div v-if="table">
    <BaseTitle :title="title" />

    <BaseCard title="Filtering">
      <template #actions>
        <div class="buttons">
          <b-button class="is-light" @click="resetFilters">
            Reset filters
          </b-button>
          <b-button class="is-dark" @click="openModalFilters">
            Add filters
          </b-button>
        </div>
      </template>

      <template #default v-if="filters">
        <div class="card-container">
          <FilterDisplay
            :fields="table.fields"
            :filterData="filters"
            class="is-horizontal"
          />
        </div>
      </template>
    </BaseCard>

    <BaseCard :title="titleWithCount">
      <template #actions>
        <div class="buttons">
          <b-button class="is-dark" @click="openModalColumns">
            Change view
          </b-button>

          <router-link
            class="button is-primary"
            :to="{ name: `table-edit`, params: { idTable } }"
          >
            Edit table
          </router-link>

          <router-link
            class="button is-primary"
            :to="{ name: `entity-edit`, params: { idTable } }"
          >
            Add new entity
          </router-link>

          <a :href="exportPath" class="button is-primary" target="_blank">
            Export
          </a>
        </div>
      </template>
      
      <template #default>
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

        <BaseTableAsync :idTable="table.id" updateQueryNav />
      </template>
    </BaseCard>
  </div>
</template>

<script>
import ModalColumns from '@/components/modals/ModalColumns'
import ModalFilters from '@/components/modals/ModalFilters'
import FilterDisplay from '@/components/filters/FilterDisplay'

import ApiService from '@/services/api'

import { mapState } from 'vuex'

export default {
  name: 'TableView',
  components: { FilterDisplay },
  props: { filterViewMode: Boolean },
  data() {
    return {
      idTable: Number(this.$route.params.idTable),
      query: {
        fields: null,
        filters: null
      }
    }
  },
  computed: {
    ...mapState('data', {
      table: function(state) {
        return state.table[this.idTable]
      },
      tableEntries: function(state) {
        return state.tableEntries[this.idTable]
      },
      filters: state => state.filters
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
    },
    exportPath() {
      return ApiService.getPath(`tables/${this.idTable}/csv-export/`, true)
    }
  },
  mounted() {
    this.$store.dispatch('data/getTable', this.idTable).then(() => {})

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
    },

    openModalFilters() {
      this.$buefy.modal.open({
        parent: this,
        component: ModalFilters,
        hasModalCard: true,
        trapFocus: true,
        props: {
          table: this.table
        }
      })
    },

    resetFilters() {
      this.$store.commit('data/setFilters', {})

      const __fields = this.$route.query.__fields

      this.$router
        .push({
          query: { ...(__fields && { __fields }) }
        })
        .catch(() => {})

      // console.log(this.$route.query)
    }
  }
}
</script>
