<template>
  <div class="filter-component">
    <div class="filter-body">
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

      <VField label="Enter date" rules="required">
        <VDate v-model="innerValue.values[0]" />
      </VField>

      <VField
        label="Enter end date"
        v-if="innerValue.type == 'interval'"
        rules="required"
      >
        <VDate v-model="innerValue.values[1]" />
      </VField>
    </div>

    <slot v-bind="{ update }"></slot>
  </div>
</template>

<script>
import { FilterOptions } from '@/services/field'

export default {
  props: {
    field: Object,
    value: Object
  },
  data() {
    return {
      innerValue: this.computeValue(),
      choices: FilterOptions.date
    }
  },
  methods: {
    computeValue() {
      return this.value
        ? JSON.parse(JSON.stringify(this.value))
        : { type: null, values: [null, null] }
    },
    update() {
      if (this.innerValue.type != 'interval') this.innerValue.values.length = 1

      this.$emit('input', this.innerValue)
    }
  },
  watch: {
    value() {
      this.innerValue = this.computeValue()
    }
  }
}
</script>
