<template>
  <div class="filter-display">
    <template v-for="(filter, index) in filters">
      <b-field
        v-if="filter != null"
        :label="getFieldDef(index).display_name"
        :key="`filterkey-${index}`"
      >
        <div class="tags">
          <b-tag
            v-for="(tag, name) in getValues(filter, index)"
            :key="`tag-${name}`"
            >{{ tag }}</b-tag
          >
        </div>
      </b-field>
    </template>
  </div>
</template>

<script>
import FieldService from '@/services/field'
import { FilterOptions } from '@/services/field'

import { mapState } from 'vuex'

export default {
  props: {
    fields: Array
  },
  data() {
    return {}
  },
  computed: mapState('data', {
    filters: state => state.filters
  }),
  methods: {
    getFieldDef(field_name) {
      return this.fields.find(e => e.name == field_name)
    },
    getValues(filter, field_name) {
      const field_type = this.getFieldDef(field_name).field_type

      if (Array.isArray(filter)) {
        return filter
      }

      if (typeof filter == 'object') {
        if (filter.type == 'interval') {
          const values = [
            FieldService.getParsedValue(filter.values[0], field_type),
            FieldService.getParsedValue(filter.values[1], field_type)
          ]

          return [values[0] + ' – ' + values[1]]
        } else
          return [
            (filter.type != 'exact'
              ? FilterOptions[field_type][filter.type] + ' '
              : '') + FieldService.getParsedValue(filter.values[0], field_type)
          ]
      }

      return [filter.toString()]
    }
  }
}
</script>
