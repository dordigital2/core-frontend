<template>
  <div>
    <VField label="Choose filter mode">
      <b-select v-model="innerValue.type">
        <option
          v-for="(choice, index) in choices"
          :key="`choice-${choice}`"
          :value="index"
          >{{ choice }}</option
        >
      </b-select>
    </VField>

    <VField label="Enter value">
      <b-input type="number" v-model.number="innerValue.values[0]"></b-input>
    </VField>

    <VField label="Enter end value" v-if="innerValue.type == 'interval'">
      <b-input type="number" v-model.number="innerValue.values[1]"></b-input>
    </VField>
  </div>
</template>

<script>
import { FilterOptions } from '@/services/field'

export default {
  props: {
    name: String,
    value: Object
  },
  data() {
    return {
      type: null,
      innerValue: this.value || { type: null, values: [] },
      choices: FilterOptions.number
    }
  },
  methods: {},
  watch: {
    innerValue: {
      deep: true,

      handler(input) {
        if (input.type != 'interval') input.values.length = 1

        this.$emit('input', input)
      }
    },
    value(input) {
      this.innerValue = input != null ? input : { type: null, values: [] }
    }
  }
}
</script>
