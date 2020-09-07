<template>
  <div class="card">
    <div class="card-header">
      <div class="card-header-title" v-html="title"></div>

      <div class="card-header-actions" v-if="!!$slots.actions">
        <slot name="actions"></slot>
      </div>
    </div>

    <div class="card-body">
      <slot></slot>
    </div>

    <div class="card-footer" v-if="!!$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
  components: {},
  data() {
    return {}
  },
  props: {
    title: String
  }
}
</script>
