<template>
  <component :is="icon[1]" />
</template>

<script>
import AlertCircleOutline from 'vue-material-design-icons/AlertCircleOutline.vue'
import ArchiveOutline from 'vue-material-design-icons/ArchiveOutline.vue'
import ArrowUp from 'vue-material-design-icons/ArrowUp.vue'
import ChartBoxOutline from 'vue-material-design-icons/ChartBoxOutline.vue'
import DnsOutline from 'vue-material-design-icons/DnsOutline.vue'
import Download from 'vue-material-design-icons/Download.vue'
import EyeOutline from 'vue-material-design-icons/EyeOutline.vue'
import MenuDown from 'vue-material-design-icons/MenuDown.vue'
import MenuUp from 'vue-material-design-icons/MenuUp.vue'
import MonitorDashboard from 'vue-material-design-icons/MonitorDashboard.vue'
import Power from 'vue-material-design-icons/Power.vue'
import SquareEditOutline from 'vue-material-design-icons/SquareEditOutline.vue'

export default {
  name: 'IconMdi',
  components: {
    AlertCircleOutline,
    ArchiveOutline,
    ArrowUp,
    ChartBoxOutline,
    DnsOutline,
    Download,
    EyeOutline,
    MenuDown,
    MenuUp,
    MonitorDashboard,
    Power,
    SquareEditOutline
  },
  props: {
    icon: Array,
    size: String
  }
}
</script>
