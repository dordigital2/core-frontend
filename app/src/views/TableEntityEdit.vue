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
                  v-if="entity.data[field.name] != null"
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
import { mapState } from 'vuex'
import FieldService from '@/services/field'

export default {
  name: 'TableEntityEdit',
  components: {},
  data() {
    return {
      entity: null
    }
  },
  computed: {
    ...mapState({
      table: state => state.data.table
    })
  },
  mounted() {
    this.$store.dispatch('data/getTable', this.$route.params.idTable)

    TableService.getEntity(
      this.$route.params.idTable,
      this.$route.params.idEntity
    ).then(response => {
      this.entity = response
    })
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
        this.$route.params.idTable,
        this.$route.params.idEntity,
        this.entity.data
      ).then(() => {
        this.$buefy.toast.open({
          message: 'Update successful.',
          type: 'is-success'
        })
      })
    }
  }
}
</script>
