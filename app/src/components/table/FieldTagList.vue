<template>
  <div class="tags">
    <b-tag v-for="(item, index) in tags" :key="index">{{ item }}</b-tag>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    name: String,
    props: Object
  },
  data() {
    return {
      tags: Array.isArray(this.props.data[this.name])
        ? this.props.data[this.name]
        : [this.props.data[this.name]]
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  margin-top: -5px;
  margin-bottom: -11px !important;
}
</style>
