<template>
  <div>
    <component
      v-if="data"
      class="chart-container"
      :is="chartComponent"
      v-bind="{ chartData: data, options }"
    />
  </div>
</template>

<script>
import * as Charts from '.'
import ChartService from '@/services/chart'
import { mapState } from 'vuex'

export default {
  components: { ...Charts },
  props: {
    idChart: Number,
    chartData: Object,
    chartConfig: Object
  },
  data() {
    return {
      data: null,
      options: {
        tooltips: {
          mode: 'index'
        }
      }
    }
  },
  computed: {
    ...mapState('data', {
      loading: function(state) {
        return state.loading[this.idChart]
      }
    }),
    chartComponent() {
      return ChartService.getComponent(this.chartConfig.chart_type)
    }
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
      this.options = Object.assign({}, this.chartData.options, this.options)
    }
  },
  watch: {
    chartData() {
      this.prepareData()
    }
  }
}
</script>
