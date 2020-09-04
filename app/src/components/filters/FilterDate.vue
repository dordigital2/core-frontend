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

    <VField label="Enter date">
      <VDate v-model="innerValue.values[0]"></VDate>
    </VField>

    <VField label="Enter end date" v-if="innerValue.type == 'interval'">
      <VDate
        v-model="innerValue.values[1]"
      ></VDate>
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
      innerValue: this.value || { type: null, values: [] },
      choices: FilterOptions.date
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
      this.innerValue =
        input != null ? input : { type: null, values: [] }
    }
  }
}
</script>
