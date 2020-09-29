<template>
  <div v-if="chart">
    <BaseTitle title="Chart view" />

    <FilterHead
      v-if="table"
      v-bind="{ table, filterMode: true, filterData: chart.filters }"
      @update="getChartData"
      viewType="charts"
    />

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

      <template #default>
        <div class="card-container" v-if="table">
          Last edit: {{ table.last_edit_date | parseDate }}
          <span v-if="table.last_edit_user"
            >by
            {{
              table.last_edit_user.first_name +
                ' ' +
                table.last_edit_user.last_name
            }}
          </span>
        </div>

        <BaseChart
          v-bind="{ idChart, chartData, chartConfig: chart.config }"
          v-if="chartData"
        />
      </template>
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
  }
}
</script>
