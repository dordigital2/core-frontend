<template>
  <div>
    <BaseTitle title="Build table" />

    <BaseCard :title="`Import data and create table ${JSON.stringify(name)}`">
      <div class="card-container">
        <div class="columns">
          <div class="column is-3">
            <VField label="Select file type">
              <VSelect :choices="['csv']" v-model="filetype" />
            </VField>
          </div>
          <div class="column is-2">
            <VField label="Delimiter">
              <b-input v-model="delimiter" />
            </VField>
          </div>
          <div class="column is-7">
            <VField label="File selection">
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
        <b-button type="is-primary" @click="submit">Continue</b-button>
      </template>
    </BaseCard>
  </div>
</template>

<script>
export default {
  name: 'TableImport',
  data() {
    return {
      name: this.$route.query.name,
      filetype: null,
      delimiter: null,
      file: null
    }
  },
  methods: {
    submit() {
      const idTable = 46
      const formData = new FormData()
      formData.append('file', this.file)
      formData.append('delimiter', this.delimiter)

      this.$store
        .dispatch('data/prepareImport', { idTable, data: formData })
        .then(() => {
          this.$router.push({
            name: 'table-edit',
            params: { idTable }
          })
        })
    }
  }
}
</script>
