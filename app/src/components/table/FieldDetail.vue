<template>
  <div>
    <b-button @click="showDetail" class="is-size-3 button-detail"
      ><b-icon icon="menu-down"></b-icon
    ></b-button>

    <b-message
      v-if="active && detail"
      :type="!props.success ? 'is-danger' : 'is-success'"
    >
      <div class="content">
        <ul>
          <li v-for="(entry, index) in detail" :key="index" v-html="entry" />
        </ul>
      </div>
    </b-message>
  </div>
</template>

<script>
import PluginService from '@/services/plugins'

export default {
  components: {},
  props: {
    props: Object
  },
  data() {
    return {
      active: false,
      detail: null,
      idTask: this.$route.params.idTask
    }
  },
  mounted() {
    this.PluginService = new PluginService(this.$route.params.plugin)
  },
  methods: {
    showDetail() {
      this.active = !this.active

      !this.detail && this.getDetail()
    },
    getDetail() {
      this.PluginService.getTaskDetail(this.idTask, this.props.id).then(
        response => {
          this.detail = response.stats.details
        }
      )
    }
  }
}
</script>

<style scoped lang="scss">
.button-detail {
  position: absolute;
  background-color: transparent;
  border: 0;
  box-shadow: none;
  outline: none;
}
</style>
