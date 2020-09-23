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
      dataOptions: {
        backgroundColor: function(context) {
          var index = context.datasetIndex

          return index % 2 ? '#303C6C' : '#c4c4c4'
        },
        borderColor: '#333',
        borderWidth: 1
      },
      options: {
        maintainAspectRatio: false
      }
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
        datasets: this.chartData.datasets.map(e => {
          return { ...e, ...this.dataOptions }
        }),
        labels: this.chartData.labels
      }
    }
  },
  watch: {
    chartData() {
      this.prepareData()
    }
  }
}
</script>
