<template>
  <BaseCard :title="`Table – ${table.name}`">
    <template #actions v-if="entities.length == 1">
      <router-link
        :to="{
          name: 'entity-edit',
          params: { idTable: table.id, idEntity: entities[0].id }
        }"
        class="button is-primary"
        >Edit entity</router-link
      >
    </template>

    <template v-if="entities.length">
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
    return {}
  },
  computed: mapState({
    table: function(state) {
      return state.data.table[this.idTable]
    }
  }),

  props: {
    idTable: Number,
    entities: Array,
    isEditable: Boolean
  },
  methods: {
    getParsedValue(value, type) {
      return FieldService.getParsedValue(value, type)
    }
  },
  mount: {}
}
</script>
