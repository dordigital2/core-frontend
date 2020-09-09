<template>
  <div>
    <b-table
      v-if="tableEntries && columns"
      :data="tableEntries.results"
      :loading="loading"
      :per-page="perPage"
      :current-page="page"
      :total="tableEntries.count"
      @page-change="onPageChange"
      paginated
      backend-pagination
      backend-sorting
      @sort="onSort"
    >
      <b-table-column
        v-for="(column, index) in columns"
        :key="`${column.name}-${index}`"
        v-bind="{
          label: column.display_name || column.name,
          field: column.name,
          cellClass: column.custom_class,
          headerClass: column.custom_class,
          sticky: column.sticky,
          sortable: column.sortable,
          numeric: ['int', 'float'].indexOf(column.field_type) != -1
        }"
      >
        <template v-slot="props">
          <template v-if="column.component">
            <component
              :is="column.component"
              v-bind="{ props: props.row, ...column.props }"
            ></component>
          </template>

          <template v-else>
            {{
              getValue(
                filterMode ? props.row : props.row.data,
                column.name,
                column.field_type
              )
            }}
          </template>
        </template>
      </b-table-column>

      <template slot="bottom-left"
        ><div class="pagination-per-page">
          Show
          <b-input v-model.number="perPageModel" @blur="onPerPageChange" />
          results per page
        </div></template
      >

      <template slot="empty">
        <p class="has-text-centered">
          No data to display.
        </p>
      </template>
    </b-table>
  </div>
</template>

<script>
import ActionsTable from './ActionsTable'
import FieldOwnerLink from './FieldOwnerLink'

import FieldService from '@/services/field'
import getNestedObj from 'lodash.get'

import { mapState } from 'vuex'

export default {
  components: {
    ActionsTable,
    FieldOwnerLink
  },
  data() {
    return {
      idTable: this.table.id,
      perPage: this.$route.query.perPage || 10,
      perPageModel: this.$route.query.perPage || 10,
      page: this.$route.query.page ? Number(this.$route.query.page) : 1,
      orderBy: this.$route.query.orderBy || null
    }
  },
  props: {
    table: Object,
    tableEntries: Object,
    query: String,
    updateQueryNav: { type: Boolean, default: false },
    filterMode: Boolean
  },
  computed: {
    ...mapState('data', {
      loading: function(state) {
        return state.loading[this.idTable]
      }
    }),
    columns() {
      if (this.table == null) return

      let fields = []
      let selectedFields = this.$route.query.__fields

      if (selectedFields != null) {
        selectedFields = selectedFields.split(',')

        selectedFields.forEach(e => {
          fields.push(this.table.fields.find(t => t.name == e))
        })
      } else fields = this.table.fields.slice()

      fields = fields.map(e => Object.assign(e, { sortable: true }))

      if (!this.filterMode)
        fields.push({
          name: 'actions',
          custom_class: 'actions',
          component: 'ActionsTable',
          display_name: ' ',
          sticky: true,
          props: {
            idTable: this.idTable
          }
        })

      return fields
    }
  },
  mounted() {},
  methods: {
    getValue(row, field, type) {
      const value = getNestedObj(row, field)
      if (value != null) return FieldService.getParsedValue(value, type)

      return null
    },
    updateQueryRequest(query) {
      if (this.updateQueryNav)
        this.$router
          .push({
            query: Object.assign({}, this.$route.query, query)
          })
          .catch(() => {})
      // else this.getTableEntries()
      else this.$emit('update', query)
    },
    onPageChange(page) {
      // console.log('onPageChange', page)
      this.updateQueryRequest({ page })
    },
    onPerPageChange() {
      this.perPage = Math.min(this.perPageModel, 100)
      this.perPageModel = this.perPage
      // this.page = 1
      this.updateQueryRequest({ perPage: this.perPage })
    },
    onSort(field, order) {
      // console.log(field, order)
      this.updateQueryRequest({ __order: (order == 'desc' ? '-' : '') + field })
    }
  }
}
</script>

<style scoped lang="scss"></style>
