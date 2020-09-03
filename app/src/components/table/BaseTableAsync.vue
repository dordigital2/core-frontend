<template>
  <div>
    <b-table
      v-if="data && columns"
      :data="data"
      :loading="loading"
      :per-page="perPage"
      :current-page="page"
      :total="count"
      @page-change="onPageChange"
      paginated
      backend-pagination
    >
      <b-table-column
        v-for="(column, index) in columns"
        :key="`${column.name}-${index}`"
        v-bind="{
          label: column.display_name || column.name,
          cellClass: column.custom_class,
          headerClass: column.custom_class,
          sticky: column.sticky
        }"
      >
        <template v-slot="props">
          <template v-if="column.component">
            <component
              :is="column.component"
              v-bind="{ props: props.row }"
            ></component>
          </template>

          <template v-else>
            {{ getValue(props.row.data, column.name, column.field_type) }}
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
import ActionsDatabaseArchived from './ActionsDatabaseArchived'
import ActionsTable from './ActionsTable'
import ActionsDatabaseActive from './ActionsDatabaseActive'
import FieldOwnerLink from './FieldOwnerLink'

import FieldService from '@/services/field'
import getNestedObj from 'lodash.get'

import { TableService } from '@/services/data'

export default {
  components: {
    ActionsDatabaseArchived,
    ActionsDatabaseActive,
    ActionsTable,
    FieldOwnerLink
  },
  data() {
    return {
      loading: false,
      data: [],
      table: this.tableDef,
      perPage: 10,
      perPageModel: 10,
      page: 1,
      count: 0
    }
  },
  props: {
    tableDef: Object,
    pagination: Object
  },
  computed: {
    columns() {
      if (this.table.fields == null) return

      console.log('updating columns')

      let fields = []

      let selectedFields = this.$route.query.__fields

      if (selectedFields != null) {
        selectedFields = selectedFields.split(',')

        selectedFields.forEach(e => {
          fields.push(this.table.fields.find(t => t.name == e))
        })

        // fields = fields.filter(e => selectedFields.indexOf(e.name) != -1)
      } else fields = this.table.fields.slice()

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
    this.loading = true

    if (!this.tableDef) {
      TableService.getTable(this.table.id).then(response => {
        this.table = response
      })
    }

    if (this.$route.query.perPage)
      this.perPage = this.perPageModel = this.$route.query.perPage

    if (this.$route.query.page) this.page = Number(this.$route.query.page)

    this.getTableEntries()
  },
  methods: {
    getTableEntries() {
      this.loading = true

      TableService.getEntries(this.table.id, this.$route.query).then(
        response => {
          this.data = response.results
          this.count = response.count
          this.$emit('update', this.count)

          this.loading = false
        }
      )
    },
    getValue(row, field, type) {
      const value = getNestedObj(row, field)
      if (value != null) return FieldService.getParsedValue(value, type)

      return null
    },
    updateQueryRequest(obj) {
      this.$router
        .push({
          query: Object.assign({}, this.$route.query, obj)
        })
        .catch(() => {})

      this.getTableEntries()
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
    }
  }
}
</script>

<style scoped lang="scss"></style>
