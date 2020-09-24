<template>
  <div>
    <BaseTitle title="Chart edit" />

    <ValidationObserver
      v-slot="{ passes }"
      @submit.prevent
      slim
      v-if="chartConfig"
    >
      <BaseCard title="Configuration">
        <div class="card-container card-form">
          <div class="columns is-multiline">
            <div class="column is-6">
              <VField label="Name">
                <b-input v-model="chartConfig.name" />
              </VField>
              <VField label="Select chart type">
                <b-select expanded v-model="chartConfig.chart_type">
                  <option
                    v-for="(type, key) in getChartTypes()"
                    :key="key"
                    :value="key"
                    >{{ type }}</option
                  >
                </b-select>
              </VField>

              <VField
                label="Choose one of the sources of data you already have imported or configured in your account"
                v-if="database"
              >
                <b-select expanded v-model="chartConfig.table">
                  <option
                    v-for="(table, key) in database.active_tables"
                    :value="table.id"
                    :key="key"
                    >{{ table.data.name }}</option
                  >
                </b-select>
              </VField>
            </div>
          </div>
        </div>

        <template #footer>
          <b-button class="is-primary" @click="passes(save)">
            Save changes
          </b-button>
        </template>
      </BaseCard>
    </ValidationObserver>
  </div>
</template>

<script>
import ChartConfig from '@/services/chart'
// import { ChartService } from '@/services/data'
// import { ToastService } from '@/services/buefy'
import { mapState } from 'vuex'

export default {
  name: 'ChartEdit',
  components: {},
  data() {
    return {
      idChart: Number(this.$route.params.idChart),
      chartConfig: {}
    }
  },
  computed: {
    ...mapState({
      database: state => state.data.database,
      chart: state => state.data.chart
    })
  },
  mounted() {
    if (!this.database) this.$store.dispatch('data/getDatabase')

    if (this.idChart) {
      this.$store.dispatch('data/getChart', this.idChart).then(() => {
        this.chartConfig = { ...this.chart.config }
      })
    }
  },
  methods: {
    getChartTypes() {
      return ChartConfig.getChartTypes()
    },
    save() {
      // this.
      // ToastService.open('not implemented yet')
    }
  }
}
</script>
