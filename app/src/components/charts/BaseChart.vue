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
import * as Charts from '.'
// import { ChartService } from '@/services/chart'
import { mapState } from 'vuex'

export default {
  components: { ...Charts },
  props: {
    idChart: Number,
    chartData: Object
  },
  data() {
    return {
      chart_type: 'ChartBar',
      data: null,
      dataOptions: {
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
