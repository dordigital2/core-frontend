<template>
  <div v-if="chart">
    <BaseTitle title="Chart view" />

    <FilterHead :table="table" />

    <BaseCard :title="`Chart — ${chart.name}`">
      <template #actions>
        <router-link
          class="button is-primary"
          :to="{
            name: 'chart-edit',
            params: { idChart }
          }"
        >
          Edit chart
        </router-link>
      </template>

      <BaseChart
        v-bind="{ idChart, chartData, chartConfig: chart.config }"
        v-if="chartData"
      />
    </BaseCard>
  </div>
</template>

<script>
import { ChartService } from '@/services/data'
import BaseChart from '@/components/charts/BaseChart'
import FilterHead from '@/components/filters/FilterHead'

import { mapState } from 'vuex'

export default {
  name: 'ChartView',
  components: { FilterHead, BaseChart },
  props: {},
  data() {
    return {
      idChart: Number(this.$route.params.idChart),
      chartData: null
    }
  },
  computed: {
    ...mapState('data', {
      table: function(state) {
        return state.table[this.chart.config.table]
      },
      chart: function(state) {
        return state.chart
      }
    })
  },
  mounted() {
    this.$store.dispatch('data/getChart', this.idChart).then(() => {
      this.$store.dispatch('data/getTable', this.chart.config.table)

      this.$store.commit('data/setFilters', {
        idChart: this.idChart,
        filter: this.chart.filters
      })

      if (!this.chart.filters) this.getChartData()
    })
  },
  methods: {
    getChartData() {
      ChartService.getChartData(
        this.idChart,
        Object.assign({}, this.$route.query)
      ).then(response => {
        this.chartData = response
      })
    }
  },
  watch: {
    '$route.query'() {
      this.getChartData()
    }
  }
}
</script>
