<template>
  <div class="card card-chart" v-if="data != null">
    <div class="card-body">
      <div>
        <p class="is-size-6 has-text-weight-semibold">{{ title }}</p>
        <h2 class="card-number">{{ data }}</h2>
      </div>
      <b-icon icon="flag-outline" class="card-icon" />
    </div>
  </div>
</template>

<script>
// import ChartService from '@/services/chart'
// import { mapState } from 'vuex'

export default {
  components: {},
  props: {
    data: Number,
    title: String
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>
