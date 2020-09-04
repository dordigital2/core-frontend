<template>
  <div v-if="table && entity">
    <BaseTitle title="Edit entity" />

    <ValidationObserver v-slot="{ passes }" @submit.prevent slim>
      <BaseCard :title="`Table – ${table.name}: Edit entity`">
        <div class="card-container card-form">
          <div class="columns is-multiline">
            <div
              v-for="field in table.fields"
              :key="`field-${field.id}`"
              class="column is-6"
            >
              <VField :label="field.display_name">
                <component
                  :is="getComponent(field.field_type)"
                  v-model="entity.data[field.name]"
                  :choices="field.choices"
                />
              </VField>
            </div>
          </div>
        </div>

        <template #footer>
          <button class="button is-primary" @click="passes(save)">
            Save changes
          </button>
        </template>

        <pre>{{ entity.data }}</pre>
      </BaseCard>
    </ValidationObserver>
  </div>
</template>

<script>
import { TableService } from '@/services/data'
import { ToastService } from '@/services/buefy'
import FieldService from '@/services/field'
import { mapState } from 'vuex'

export default {
  name: 'TableEntityEdit',
  components: {},
  data() {
    return {
      idTable: Number(this.$route.params.idTable),
      entity: null
    }
  },
  computed: {
    ...mapState({
      table: function(state) {
        return state.data.table[this.idTable]
      }
    })
  },
  mounted() {
    this.$store.dispatch('data/getTable', this.idTable)

    TableService.getEntity(this.idTable, this.$route.params.idEntity).then(
      response => {
        this.entity = response
      }
    )
  },
  methods: {
    findField(name) {
      return this.table.find(e => e.name == name)
    },
    getComponent(type) {
      return FieldService.getComponent(type)
    },
    save() {
      return TableService.putEntity(
        this.idTable,
        this.$route.params.idEntity,
        this.entity.data
      ).then(() => {
        ToastService.open('Update successful')
      })
    }
  }
}
</script>
