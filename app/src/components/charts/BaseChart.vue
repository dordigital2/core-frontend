<template>
  <div>
    <component
      v-if="data"
      class="chart-container"
      :is="chart_type"
      v-bind="{ chartData: data, options }"
    />
  </div>
</template>

<script>
import ChartBar from './ChartBar'
import { mapState } from 'vuex'

export default {
  components: { ChartBar },
  props: {
    idChart: Number,
    chartData: Object
  },
  data() {
    return {
      chart_type: 'ChartBar',
      data: null,
      options: {}
    }
  },
  computed: {
    ...mapState('data', {
      loading: function(state) {
        return state.loading[this.idChart]
      }
    })
  },
  mounted() {
    this.prepareData()
  },
  methods: {
    prepareData() {
      this.data = {
        datasets: this.chartData.datasets,
        labels: this.chartData.labels
      }
      this.options = this.chartData.options
    }
  },
  watch: {
    chartData() {
      this.prepareData()
    }
  }
}
</script>
