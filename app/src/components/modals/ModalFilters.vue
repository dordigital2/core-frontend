<template>
  <div class="modal-card" style="width: 960px">
    <header class="modal-card-head">
      <p class="modal-card-title">Filter options</p>
      <button type="button" class="delete" @click="$emit('close')" />
    </header>

    <section class="modal-card-body" v-if="table">
      <div class="columns">
        <div class="column">
          <p class="has-text-weight-semibold is-size-6">Filter list</p>

          <b-tabs
            v-model="activeTab"
            class="filter-tabs"
            :animated="false"
            vertical
          >
            <b-tab-item
              v-for="field in table.fields"
              :key="field.id"
              :label="getFilterLabel(field)"
              :header-class="{
                'is-highlight':
                  filterData[field.name] != null &&
                  filterData[field.name].length
              }"
            >
              <div class="tab-content-head">
                <b-button
                  type="is-dark"
                  :disabled="checkDisabled(field)"
                  @click="removeFilter(field.name)"
                  >Clear filter</b-button
                >
              </div>

              <component
                v-model="filterData[field.name]"
                v-bind="{
                  placeholder: field.display_name,
                  choices: field.choices,
                  name: field.name,
                  field_type: field.field_type
                }"
                :is="getComponent(field.field_type)"
              />
            </b-tab-item>
          </b-tabs>
        </div>
        <div class="column is-3">
          <p class="has-text-weight-semibold is-size-6">Selected filters</p>
          <br />

          <FilterDisplay
            :fields="table.fields"
            :filterData="filterData"
            isEditable
            @remove="removeFilter"
          />
        </div>
      </div>
    </section>
    <footer class="modal-card-foot">
      <b-button class="is-dark is-outlined" @click="$emit('close')">
        Cancel
      </b-button>
      <b-button class="is-dark" @click="submit">Apply</b-button>
    </footer>
  </div>
</template>

<script>
import FieldService from '@/services/field'

import FilterEnum from '@/components/filters/FilterEnum'
import FilterNumeric from '@/components/filters/FilterNumeric'
import FilterDate from '@/components/filters/FilterDate'
import FilterDisplay from '@/components/filters/FilterDisplay'

import { mapState } from 'vuex'

export default {
  name: 'ModalFilters',
  components: { FilterEnum, FilterNumeric, FilterDisplay, FilterDate },
  props: {
    table: Object
  },
  data() {
    return {
      activeTab: 0,
      filterData: {}
    }
  },
  computed: mapState({
    filters: state => state.data.filters || {}
  }),
  mounted() {
    if (this.filters != null) this.filterData = { ...this.filters }
    // this.table.fields.forEach(e => {
    //   this.$set(this.filters, e.name, null)
    // })
  },
  methods: {
    getComponent(type) {
      return FieldService.getFilterComponent(type)
    },
    getFilterLabel(field) {
      let label = field.display_name
      const filter = this.filterData[field.name]

      if (filter != null) {
        if (Array.isArray(filter)) {
          if (filter.length) label += ` (${this.filterData[field.name].length})`
        } else label += ' (1)'
      }

      return label
    },
    checkDisabled(field) {
      if (this.filterData[field.name] != null) return false
      return true
    },
    removeFilter(name, index) {
      // console.log('removeFilter', name, index)

      if (Array.isArray(this.filterData[name]))
        this.filterData[name].splice(index, 1)
      else this.$delete(this.filterData, name)
    },
    submit() {
      this.$store.commit('data/setFilters', {
        idTable: this.table.id,
        filter: this.filterData
      })
      this.$emit('submit')
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.modal-card {
  overflow: visible;

  .modal-card-head {
    border-bottom: 1px solid $grey-lighter;
  }

  .modal-card-foot {
    border-top: 1px solid $grey-lighter;
  }

  .modal-card-body {
    padding: 15px 24px;
    overflow: visible;
    //
    .columns {
      .column {
        &:last-child {
          border-left: 1px solid $grey-lighter;
        }
      }
    }
  }
}
</style>
