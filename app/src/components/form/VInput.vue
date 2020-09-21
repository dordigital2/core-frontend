<template>
  <ValidationProvider
    :name="name || label"
    :rules="rules"
    v-slot="{ errors }"
  >
    <b-input v-model="innerValue" />
    {{errors}}
  </ValidationProvider>
</template>

<script>

export default {
  props: {
    value: null,
    rules: {
      type: [Object, String],
      default: ''
    },
    name: String,
    label: String,
    column: String,
    description: String,
    labelInfo: String,
    mode: String,
    grouped: Boolean,
    expanded: Boolean
  },
  data() {
    return {
      innerValue: this.value
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
