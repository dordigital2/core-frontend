<template>
  <div class="card">
    <div class="card-header">
      <div class="card-header-title" v-html="title"></div>

      <div class="card-header-actions" v-if="!!this.$slots.actions">
        <slot name="actions"></slot>
      </div>
    </div>

    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  components: {},
  data() {
    return {}
  },
  props: {
    title: String,
    data: Array,
    columns: Array
  }
}
</script>
