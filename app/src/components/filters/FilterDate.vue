<template>
  <div>
    <VField label="Choose filter mode">
      <b-select v-model="innerValue.type" @input="updateValue">
        <option
          v-for="(choice, index) in choices"
          :key="`choice-${choice}`"
          :value="index"
          >{{ choice }}</option
        >
      </b-select>
    </VField>

    <VField label="Enter date">
      <VDate v-model="innerValue.values[0]" @input="updateValue" />
    </VField>

    <VField
      label="Enter end date"
      @input="updateValue"
      v-if="innerValue.type == 'interval'"
    >
      <VDate v-model="innerValue.values[1]" @input="updateValue" />
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
      innerValue: this.value || { type: null, values: [null, null] },
      choices: FilterOptions.date
    }
  },
  methods: {
    updateValue() {
      if (this.innerValue.type != 'interval') this.innerValue.values.length = 1
      this.$emit('input', this.innerValue)
    }
  },
  watch: {
    value(input) {
      this.innerValue = input ? input : { type: null, values: [null, null] }
    }
  }
}
</script>
