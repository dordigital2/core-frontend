<template>
  <div class="has-text-centered">
    <b-checkbox @input="onChange" />
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    action: String,
    props: Object
  },
  methods: {
    onChange(value) {
      this.$store.dispatch(`data/${this.action}`, {
        id: this.props.id,
        data: { [this.name]: value }
      })
    }
  }
}
</script>