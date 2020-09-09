<template>
  <BaseCard :title="`Table – ${table.name}`" v-if="table && entities">
    <template #actions>
      <router-link
        v-if="entities.length == 1"
        :to="{
          name: 'entity-edit',
          params: { idTable: idTable, idEntity: entities[0].id }
        }"
        class="button is-primary"
        >Edit entity</router-link
      >
      <a
        v-if="closeable"
        href="#"
        class="is-size-4 button-close"
        @click.prevent="$emit('remove')"
        ><b-icon icon="close"
      /></a>
    </template>

    <template v-if="entities && entities.length">
      <div
        class="columns is-multiline is-gapless card-container card-list-item"
        v-for="(entity, index) in entities"
        :key="`entity-${index}`"
      >
        <div
          class="column is-4-desktop is-3-widescreen"
          v-for="(field, index) in table.fields"
          :key="`field-${index}`"
        >
          <div class="info-entry">
            <span class="info-label">{{ field.display_name }}: </span>
            <span class="info-value">{{
              getParsedValue(entity.data[field.name], field.field_type)
            }}</span>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="card-container is-size-6">
        No results
      </div>
    </template>
  </BaseCard>
</template>

<script>
import FieldService from '@/services/field'
import { mapState } from 'vuex'

export default {
  name: 'TableEntityCard',
  components: {},
  data() {
    return {
      entities: []
    }
  },
  computed: mapState({
    table: function(state) {
      return state.data.table[this.idTable]
    },
    tableEntries: function(state) {
      return state.data.tableEntries[this.idTable]
    }
  }),
  props: {
    idTable: Number,
    query: Object,
    entity: Object,
    closeable: Boolean
  },
  methods: {
    getParsedValue(value, type) {
      return FieldService.getParsedValue(value, type)
    }
  },
  mounted() {
    if (!this.table) this.$store.dispatch('data/getTable', this.idTable)

    if (this.entity) this.entities = [this.entity]
    else
      this.$store
        .dispatch('data/getTableEntries', {
          idTable: this.idTable,
          query: this.query
        })
        .then(() => {
          this.entities = this.tableEntries.results
        })
  }
}
</script>

<style lang="scss" scoped>
.button-close {
  height: 40px;
  color: $black-light;
  margin-left: 8px;

  .icon {
    height: 40px;
  }

  &:hover {
    color: $primary;
  }
}
</style>
