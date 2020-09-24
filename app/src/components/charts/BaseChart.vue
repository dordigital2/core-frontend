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
import ChartLine from './ChartLine'
import { mapState } from 'vuex'

export default {
  components: { ChartBar, ChartLine },
  props: {
    idChart: Number,
    chartData: Object
  },
  data() {
    return {
      chart_type: 'ChartLine',
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
      // this.chart_type = this.chartData.type
    }
  },
  watch: {
    chartData() {
      this.prepareData()
    }
  }
}
</script>
