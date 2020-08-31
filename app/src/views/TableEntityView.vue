<template>
  <div>
    <BaseTitle :title="'Entity view'" />

    <Card :title="`Table - ${table.name}`">
      <VTable :data="[entity]" :columns="table.fields" />
    </Card>

    <Card :title="`Table - ${table.name}`">
      <template #actions>
        <button class="button is-primary">Edit entity</button>
      </template>
      <div class="columns is-multiline is-gapless info">
        <div
          class="column is-4-desktop is-3-widescreen"
          v-for="(prop, index) in entity.data"
          :key="`prop-${index}`"
        >
          <div class="info-entry">
            <span class="info-label">{{ index }}: </span>
            <span class="info-value">{{ prop }}</span>
          </div>
        </div>
      </div>
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
