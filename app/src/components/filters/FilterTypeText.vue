<template>
  <div class="filter-component">
    <div class="filter-body">
      <VField label="Enter value" rules="required">
        <b-input v-model="innerValue" />
      </VField>
    </div>

    <slot v-bind="{ update }"></slot>
  </div>
</template>

<script>
export default {
  props: {
    field: Object,
    value: String
  },
  data() {
    return {
      type: null,
      innerValue: this.value
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
