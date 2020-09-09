<template>
  <b-datepicker
    icon="calendar-blank-outline"
    iconPrev="arrow-left"
    iconNext="arrow-right"
    v-model="innerValue"
    v-bind="{ customClass, disabled, placeholder, readonly, inline }"
  />
</template>

<script>
export default {
  props: {
    choices: Array,
    customClass: String,
    disabled: String,
    placeholder: String,
    inline: Boolean,
    readonly: Boolean,
    value: null
  },
  data() {
    return {
      innerValue: this.value ? new Date(this.value) : null
    }
  },
  watch: {
    innerValue(input) {
      if (input) this.$emit('input', input.toISOString())
    },
    value(input) {
      this.innerValue = input ? new Date(input) : null
    }
  }
}
</script>
