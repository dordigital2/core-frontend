<template>
  <div>
    <slot v-bind="{ update }"></slot>

    <VField label="Enter value" rules="required">
      <b-input v-model="innerValue" />
    </VField>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    value: String
  },
  data() {
    return {
      type: null,
      innerValue: null
    }
  },
  methods: {
    update() {
      this.$emit('input', this.innerValue)
    }
  },
  watch: {
    value(input) {
      this.innerValue = input
    }
  }
}
</script>
