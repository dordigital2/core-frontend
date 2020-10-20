<template>
  <div>
    <BaseTitle title="Table import data" />

    <ValidationObserver v-slot="{ passes }" @submit.prevent slim>
      <BaseCard :title="title">
        <div class="card-container">
          <div class="columns">
            <div class="column is-5" v-if="isManualImport && database">
              <VField label="Import to table" rules="required">
                <b-select
                  placeholder="Select a table"
                  v-model="idTable"
                  expanded
                >
                  <option
                    v-for="table in database.active_tables"
                    :value="table.id"
                    :key="table.id"
                  >
                    Table – {{ table.data.name }}
                  </option>
                </b-select>
              </VField>
            </div>
          </div>
          <div class="columns">
            <div class="column is-3">
              <VField label="Select file type" rules="required">
                <VSelect :choices="['csv']" v-model="filetype" />
              </VField>
            </div>
            <div class="column is-2">
              <VField label="Delimiter" rules="">
                <b-input v-model="delimiter" placeholder="leave empty for autodetection.."/>
              </VField>
            </div>
            <div class="column is-7">
              <VField label="File selection" rules="required">
                <div class="file is-right is-dark is-fullwidth">
                  <b-upload v-model="file" expanded>
                    <span class="file-cta">
                      <span class="file-label">Browse</span>
                    </span>
                    <span class="file-name">
                      <span v-if="file">{{ file.name }}</span>
                    </span>
                  </b-upload>
                </div>
              </VField>
            </div>
          </div>
        </div>

        <template #footer>
          <b-button type="is-primary" @click="passes(submit)"
            >Continue</b-button
          >
        </template>
      </BaseCard>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TableImportForm',
  data() {
    return {
      title: null,
      idTable: null,
      isManualImport: null,
      filetype: 'csv',
      delimiter: null,
      file: null
    }
  },
  computed: mapState({
    database: state => state.data.database
  }),
  mounted() {
    this.checkIfManual()
  },
  methods: {
    checkIfManual() {
      this.isManualImport = this.$route.query.manual

      if (this.isManualImport) {
        if (!this.database) this.$store.dispatch('data/getDatabase')
        this.title = 'Import data to existing table'
      } else {
        this.title = `Import data and create table ${JSON.stringify(
          this.$route.query.name
        )}`
      }
    },
    submit() {
      const formData = new FormData()
      formData.append('file', this.file)
      formData.append('delimiter', this.delimiter)

      // @TODO: we need to go through table-edit before if isManual
      if (this.isManualImport) {
        this.$store
          .dispatch('data/manualImport', {
            idTable: this.idTable,
            data: formData
          })
          .then(response => {
            this.$router.push({
              name: 'table-import-result',
              params: { idImport: response.import_id }
            })
          })
      } else {
        this.$store.dispatch('data/prepareImport', formData).then(response => {
          this.$router.push({
            name: 'table-edit',
            params: { ...(this.isManualImport && { idTable: this.idTable }) },
            query: { idImport: response.import_id, ...this.$route.query }
          })
        })
      }
    }
  },
  watch: {
    '$route.query'() {
      this.checkIfManual()
    }
  }
}
</script>
