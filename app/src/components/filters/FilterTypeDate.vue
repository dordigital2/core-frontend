<template>
  <div class="filter-component">
    <div class="filter-body">
      <VField label="Choose filter mode" rules="required">
        <b-select v-model="innerValue.type" @input="reset">
          <option
            v-for="(choice, index) in choices"
            :key="`choice-${choice}`"
            :value="index"
            >{{ choice }}</option
          >
        </b-select>
      </VField>

      <template v-if="!isRelative">
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
      </template>

      <VField label="Time frame" v-if="isRelative">
        <b-select v-model="innerValue.values[0]">
          <option
            v-for="(type, key) in relativeDate"
            :value="key"
            :key="key"
            v-text="type"
          />
        </b-select>
      </VField>
    </div>

    <slot v-bind="{ update }"></slot>
  </div>
</template>

<script>
import { FilterOptions, FilterRelativeDate } from '@/services/field'

export default {
  props: {
    field: Object,
    value: Object
  },
  data() {
    return {
      innerValue: this.computeValue(),
      choices: FilterOptions.date,
      relativeDate: FilterRelativeDate
    }
  },
  computed: {
    isRelative() {
      return this.innerValue.type == 'relative'
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
    },
    reset() {
      if (!this.isRelative && new Date(this.innerValue.values[0]) == 'Invalid Date') {
        this.innerValue.values[0] = null
      }
    }
  },
  watch: {
    value() {
      this.innerValue = this.computeValue()
    }
  }
}
</script>
