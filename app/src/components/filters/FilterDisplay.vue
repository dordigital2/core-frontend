<template>
  <div class="filter-display">
    <template v-for="(filter, name) in filterData">
      <b-field
        v-if="filter != null"
        :label="getFieldDef(name).display_name"
        :key="`filterkey-${name}`"
      >
        <div class="tags">
          <b-tag
            v-for="(tag, index) in getValues(filter, name)"
            :key="`tag-${index}`"
            @close="$emit('remove', name, index)"
            close-icon="close"
            :closable="isEditable"
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

export default {
  props: {
    fields: Array,
    filterData: Object,
    isEditable: Boolean
  },
  data() {
    return {}
  },
  methods: {
    getFieldDef(name) {
      return this.fields.find(e => e.name == name)
    },
    getValues(filter, name) {
      const field_type = this.getFieldDef(name).field_type

      if (Array.isArray(filter)) {
        let filterLtd = filter.slice(0, 5)
        if (filter.length > 5) filterLtd.push(`+ ${filter.length - 5} more`)

        return filterLtd
      }

      if (typeof filter == 'object') {
        if (filter.values[0] == null) return null

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
