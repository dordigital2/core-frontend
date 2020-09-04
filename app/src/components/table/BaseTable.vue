<template>
  <div>
    <b-table v-if="data && columns" :data="data">
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

export default {
  components: {
    ActionsDatabaseArchived,
    ActionsDatabaseActive,
    ActionsTable,
    FieldOwnerLink
  },
  data() {
    return {}
  },
  props: {
    columns: Array,
    data: Array
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
