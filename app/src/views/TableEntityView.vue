<template>
  <div>
    <BaseTitle :title="'Entity view'" />

    <Card :title="`Table - ${table.name}`">
      <pre>{{ entity.data }}</pre>
    </Card>
  </div>
</template>

<script>
// import ModalColumns from '@/components/modals/ModalColumns'
import { mapState } from 'vuex'

export default {
  name: 'TableEntityView',
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapState({
      table: state => state.data.table,
      entity: state => state.data.entity
    })
  },
  mounted() {
    // console.log('mounted', this.$route.params.idTable, this.$route.params.idEntity)
    this.$store.dispatch('data/getEntity', {
      idTable: this.$route.params.idTable,
      idEntity: this.$route.params.idEntity
    })
  }
}
</script>
