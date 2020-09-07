<template>
  <div class="tags">
    <b-tag v-for="(item, index) in props.data[name]" :key="index">{{
      item
    }}</b-tag>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    name: String,
    props: Object
  }
}
</script>

<style lang="scss" scoped>
.tags {
  margin-top: -5px;
  margin-bottom: -11px !important;
}
</style>
