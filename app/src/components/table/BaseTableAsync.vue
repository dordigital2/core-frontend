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
      :paginated="tableEntries.count > perPage"
      backend-pagination
      backend-sorting
      scrollable
      @sort="onSort"
    >
      <b-table-column
        v-for="(column, index) in columns"
        :key="`${index}-${column.name}-${columns.length}`"
        v-bind="{
          label: column.display_name || column.name,
          field: column.name,
          cellClass: column.custom_class,
          headerClass: column.custom_class,
          sticky: column.sticky,
          sortable: column.sortable !== false,
          centered: column.centered,
          numeric: ['int', 'float'].indexOf(column.field_type) != -1
        }"
      >
        <template v-slot="props">
          <template v-if="column.component">
            <component
              :is="column.component"
              v-bind="{
                props: props.row,
                ...column.props,
                value: getValue(props.row, column.name, column.field_type)
              }"
              @update="$emit('update', query)"
            />
          </template>

          <template v-else>
            {{ getValue(props.row, column.name, column.field_type) }}
          </template>
        </template>
      </b-table-column>

      <template slot="bottom-left" v-if="customPerPage"
        ><div class="pagination-per-page">
          Show
          <b-input
            type="number"
            v-model.number="perPageModel"
            @blur="onPerPageChange"
          />
          results per page
        </div></template
      >

      <template slot="empty">
        <p>
          No data to display.
        </p>
      </template>
    </b-table>
  </div>
</template>

<script>
import ActionsCards from './ActionsCards'
import ActionsCharts from './ActionsCharts'
import ActionsPlugin from './ActionsPlugin'
import ActionsTable from './ActionsTable'
import ActionsTableEntity from './ActionsTableEntity'
import ActionsTableView from './ActionsTableView'
import ActionsUser from './ActionsUser'
import FieldPluginTaskDetail from './FieldPluginTaskDetail'
import FieldCheckbox from './FieldCheckbox'
import FieldOwnerLink from './FieldOwnerLink'
import FieldRouterLink from './FieldRouterLink'
import FieldStatusTag from './FieldStatusTag'
import FieldLiveTag from './FieldLiveTag'
import FieldTagList from './FieldTagList'

import FieldService from '@/services/field'
import getNestedObj from 'lodash.get'

import { mapState } from 'vuex'

export default {
  components: {
    ActionsCards,
    ActionsCharts,
    ActionsPlugin,
    ActionsTable,
    ActionsTableEntity,
    ActionsTableView,
    ActionsUser,
    FieldPluginTaskDetail,
    FieldCheckbox,
    FieldOwnerLink,
    FieldRouterLink,
    FieldStatusTag,
    FieldLiveTag,
    FieldTagList
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
    filterMode: Boolean,
    customPerPage: Boolean,
    updateQueryNav: { type: Boolean, default: false },
    tableActionsComponent: { type: String, default: 'ActionsTable' }
  },
  computed: {
    ...mapState('data', {
      loading: function(state) {
        return state.loading[this.idTable]
      }
    }),
    columns() {
      if (this.table == null) return

      let selectedFields = this.$route.query.__fields
        ? this.$route.query.__fields.split(',')
        : this.table.default_fields

      const fields = []

      selectedFields.forEach(e => {
        const field = this.table.fields.find(f => f.name == e)
        field && fields.push({ ...field })
      })

      if (!this.filterMode)
        fields.push({
          name: 'actions',
          custom_class: 'actions',
          component: this.tableActionsComponent,
          display_name: ' ',
          sticky: true,
          sortable: false,
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
      const obj = row.data ? row.data : row
      const value = getNestedObj(obj, field)

      return value != null ? FieldService.getParsedValue(value, type) : null
    },
    updateQueryRequest(query) {
      const newQuery = Object.assign({}, this.$route.query, query)

      if (this.updateQueryNav) {
        this.$router
          .push({
            query: newQuery
          })
          .catch(() => {})
      }

      this.$emit('update', newQuery)
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
