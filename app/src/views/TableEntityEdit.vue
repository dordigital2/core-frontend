<template>
  <div v-if="table && entity">
    <BaseTitle :title="pageTitle" />

    <ValidationObserver v-slot="{ passes }" @submit.prevent slim>
      <BaseCard :title="`Table – ${table.name}: ${pageTitle}`">
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
                  v-model="entity[field.name]"
                  :choices="field.choices"
                />
              </VField>
            </div>
          </div>
        </div>

        <template #footer>
          <b-button class="is-primary" @click="passes(save)">
            Save changes
          </b-button>
        </template>

        <pre>{{ entity }}</pre>
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
    }),
    pageTitle() {
      return this.$route.params.idEntity ? 'Edit entity' : 'Add new entity'
    }
  },
  mounted() {
    this.$store.dispatch('data/getTable', this.idTable)

    if (this.$route.params.idEntity)
      TableService.getEntity(this.idTable, this.$route.params.idEntity).then(
        response => {
          this.entity = response.data
        }
      )
    else this.entity = {}
  },
  methods: {
    findField(name) {
      return this.table.find(e => e.name == name)
    },
    getComponent(type) {
      return FieldService.getComponent(type)
    },
    save() {
      if (this.$route.params.idEntity)
        TableService.putEntity(
          this.idTable,
          this.$route.params.idEntity,
          this.entity
        ).then(() => {
          this.$router.go(-1)
          ToastService.open('Update successful')
        })
      else
        TableService.postEntity(this.idTable, this.entity).then(() => {
          this.$router.go(-1)
          ToastService.open('Add successful')
        })
    }
  }
}
</script>
