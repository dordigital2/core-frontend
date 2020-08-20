<template>
  <component :is="icon[1]" :size="24" />
</template>

<script>
import AlertCircleOutline from 'vue-material-design-icons/AlertCircleOutline.vue';

export default {
  name: 'IconMdi',
  components: {
    AlertCircleOutline
  },
  props: {
    icon: Array,
    size: String
  }
}
</script>
