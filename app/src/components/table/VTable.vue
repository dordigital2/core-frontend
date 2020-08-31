<template>
  <b-table :data="data" :loading="!data" v-bind="pagination">
    <template v-for="column in columns">
      <b-table-column
        :key="column.id || column.name"
        v-bind="{
          label: column.display_name || column.name,
          cellClass: column.custom_class
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
    </template>

    <template slot="empty">
      <p class="has-text-centered">
        No data to display.
      </p>
    </template>
  </b-table>
</template>

<script>
import ActionsDatabaseArchived from './ActionsDatabaseArchived'
import ActionsTable from './ActionsTable'
import ActionsDatabaseActive from './ActionsDatabaseActive'
import OwnerLink from './OwnerLink'

import FieldService from '@/services/field'
import getNestedObj from 'lodash.get'

export default {
  components: {
    ActionsDatabaseArchived,
    ActionsDatabaseActive,
    ActionsTable,
    OwnerLink
  },
  data() {
    return {}
  },
  props: {
    data: Array,
    columns: Array,
    actionComponent: String,
    pagination: Object
  },
  methods: {
    getValue(row, field, type) {
      const value = getNestedObj(row, field)
      if (value != null) return FieldService.getParsedValue(value, type)

      return null
    }
  }
}
</script>

<style scoped lang="scss"></style>
