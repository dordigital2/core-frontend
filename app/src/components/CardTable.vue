<template>
  <div class="card">
    <div class="card-header">
      <div class="card-header-title">
        {{ title }}
      </div>

      <div class="card-header-actions" v-if="!!this.$slots.actions">
        <slot name="actions"></slot>
      </div>
    </div>

    <div class="card-body">
      <VTable :data="data" :columns="columns" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardTable',
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
