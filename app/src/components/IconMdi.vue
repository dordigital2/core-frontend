<template>
  <component :is="icon[1]" />
</template>

<script>
import AlertCircleOutline from 'vue-material-design-icons/AlertCircleOutline.vue'
import ArrowUp from 'vue-material-design-icons/ArrowUp.vue'
import ChartBoxOutline from 'vue-material-design-icons/ChartBoxOutline.vue'
import DnsOutline from 'vue-material-design-icons/DnsOutline.vue'
import EyeOutline from 'vue-material-design-icons/EyeOutline.vue'
import Power from 'vue-material-design-icons/Power.vue'
import MenuDown from 'vue-material-design-icons/MenuDown.vue'
import MenuUp from 'vue-material-design-icons/MenuUp.vue'
import MonitorDashboard from 'vue-material-design-icons/MonitorDashboard.vue'


export default {
  name: 'IconMdi',
  components: {
    AlertCircleOutline,
    ArrowUp,
    ChartBoxOutline,
    DnsOutline,
    EyeOutline,
    MenuDown,
    MenuUp,
    MonitorDashboard,
    Power
  },
  props: {
    icon: Array,
    size: String
  }
}
</script>
