<template>
  <b-datepicker
    icon="calendar-blank-outline"
    iconPrev="arrow-left"
    iconNext="arrow-right"
    v-model="innerValue"
    v-bind="{ customClass, disabled, placeholder, readonly }"
  />
</template>

<script>
export default {
  props: {
    choices: Array,
    customClass: String,
    disabled: String,
    placeholder: String,
    readonly: Boolean,
    value: null
  },
  data() {
    return {
      innerValue: new Date(this.value)
    }
  },
  watch: {
    innerValue(input) {
      this.$emit('input', input)
    },

    value(input) {
      this.innerValue = input
    }
  }
}
</script>
