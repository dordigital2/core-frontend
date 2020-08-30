<template>
  <div class="modal-card" style="width: 960px">
    <header class="modal-card-head">
      <p class="modal-card-title">Choose a maximum of 7 columns for display</p>
      <button type="button" class="delete" @click="$emit('close')" />
    </header>
    <ValidationObserver v-slot="{ passes }" @submit.prevent slim>
      <section class="modal-card-body">
        <VField label="Selected columns" rules="">
          <b-taginput v-model="selectedColumns" type="is-dark" :maxtags="0" />
        </VField>

        <VField label="Column list" rules="required|over:2|under:7">
          <div class="checkbox-list is-size-6">
            <b-checkbox
              v-for="(col, index) in dummy_columns"
              :key="'check' + index"
              v-model="selectedColumns"
              :native-value="col"
            >
              {{ col }}
            </b-checkbox>
          </div>
        </VField>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-dark is-outlined" @click="$emit('close')">
          Cancel
        </button>
        <button class="button is-dark" @click="passes(submit)">Apply</button>
      </footer>
    </ValidationObserver>
  </div>
</template>

<script>
// @TODO: disable checkboxes? :disabled="selectedColumns.length == 7 && selectedColumns.indexOf(col) == -1"

export default {
  name: 'ModalColumns',
  props: {
    columns: Array
  },
  data() {
    return {
      dummy_columns: [
        'Nume',
        'Prenume',
        'Oras',
        'Altceva',
        'Code47',
        'Romania',
        'Mi-e somn',
        'E aproape septembrie si',
        'As manca',
        'Ceva bun'
      ],
      selectedColumns: []
    }
  },
  methods: {
    submit() {
      console.log('submit')
    }
  }
}
</script>
