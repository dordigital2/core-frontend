<template>
  <div>
    <slot v-bind="{ update }"></slot>

    <VField label="Choose filter mode" rules="required">
      <b-select v-model="innerValue.type">
        <option
          v-for="(choice, index) in choices"
          :key="`choice-${choice}`"
          :value="index"
          >{{ choice }}</option
        >
      </b-select>
    </VField>

    <VField label="Enter value" rules="required">
      <b-input type="number" v-model.number="innerValue.values[0]" />
    </VField>

    <VField label="Enter end value" v-if="innerValue.type == 'interval'">
      <b-input type="number" v-model.number="innerValue.values[1]" />
    </VField>
  </div>
</template>

<script>
import { FilterOptions } from '@/services/field'

export default {
  props: {
    name: String,
    value: Object,
    field_type: String
  },
  data() {
    return {
      type: null,
      choices: FilterOptions[this.field_type],
      innerValue: { type: null, values: [] }
    }
  },
  methods: {
    update() {
      if (this.innerValue.type != 'interval') this.innerValue.values.length = 1
      
      this.$emit('input', JSON.parse(JSON.stringify(this.innerValue)))
    }
  },
  watch: {
    value(input) {
      this.innerValue =
        input != null
          ? JSON.parse(JSON.stringify(input))
          : { type: null, values: [] }
    }
  }
}
</script>
