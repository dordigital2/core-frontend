<template>
  <div class="modal-card" style="width: 960px;">
    <header class="modal-card-head">
      <p class="modal-card-title">
        Filter options
        
        <span class="info"
          >Always click on <b>Set filters</b> after you made your
          selection.</span
        >
      </p>
      <button type="button" class="delete" @click="$emit('close')" />
    </header>

    <section class="modal-card-body" v-if="table && sortedFields">
      <div class="columns is-gapless">
        <div class="column">
          <b-tabs
            v-model="activeTab"
            class="filter-tabs"
            :animated="false"
            vertical
          >
            <b-tab-item
              v-for="field in sortedFields"
              :key="field.id"
              :label="getFilterLabel(field)"
              :header-class="{
                'is-highlight': filterData[field.name] != null
              }"
            >
              <ValidationObserver v-slot="{ passes, reset }" ref="observer" slim>
                <component
                  v-model="filterData[field.name]"
                  v-bind="{ field }"
                  :is="getComponent(field.field_type)"
                >
                  <template #default="props">
                    <div class="filter-buttons">
                      <div class="buttons">
                        <b-button
                          type="is-dark is-outlined"
                          :disabled="checkDisabled(field)"
                          @click="removeFilter(field.name, null, reset)"
                          >Clear filter</b-button
                        >
                        <b-button type="is-dark" @click="passes(props.update)"
                          >Set filter</b-button
                        >
                      </div>
                    </div>
                  </template>
                </component>
              </ValidationObserver>
            </b-tab-item>
          </b-tabs>
        </div>

        <div class="column is-3 is-scrollable">
          <p class="has-text-weight-semibold is-size-6 cell cell-title">
            Selected filters
          </p>

          <FilterDisplay
            class="cell cell-body"
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

import FilterDisplay from '@/components/filters/FilterDisplay'
import FilterTypeText from '@/components/filters/FilterTypeText'
import FilterTypeEnum from '@/components/filters/FilterTypeEnum'
import FilterTypeNumeric from '@/components/filters/FilterTypeNumeric'
import FilterTypeDate from '@/components/filters/FilterTypeDate'

import { mapState } from 'vuex'

export default {
  name: 'ModalFilters',
  components: {
    FilterDisplay,
    FilterTypeText,
    FilterTypeEnum,
    FilterTypeNumeric,
    FilterTypeDate
  },
  props: {
    table: Object
  },
  data() {
    return {
      activeTab: 0,
      filterData: {},
      sortedFields: null
    }
  },
  computed: mapState({
    filters: function(state) {
      return state.data.filters[this.table.id]
    }
  }),
  mounted() {
    if (this.filters != null)
      this.filterData = JSON.parse(JSON.stringify(this.filters))

    this.sortedFields = this.table.fields.sort((a, b) =>
      a.display_name < b.display_name ? -1 : 1
    )
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
    removeFilter(name, index, reset) {
      // console.log('removeFilter', name, index)

      if (Array.isArray(this.filterData[name]) && index != null) {
        this.filterData[name].splice(index, 1)

        if (!this.filterData[name].length) this.$delete(this.filterData, name)
      } else {
        this.$delete(this.filterData, name)
      }

      if (reset != null) reset()
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
$cell-padding: 18px 24px;

.modal-card {
  @include desktop {
    height: 60vh;
  }

  .modal-card-head {
    border-bottom: 1px solid $grey-lighter;
  }

  .modal-card-foot {
    border-top: 1px solid $grey-lighter;
  }

  .modal-card-body {
    padding: 0;
    display: flex;
    overflow: hidden;

    .cell {
      padding: $cell-padding;

      &.cell-title {
        background-color: $white;
        position: sticky;
        top: 0;
        z-index: 1;
      }

      &.cell-body {
        padding-top: 0;
      }
    }

    .is-scrollable {
      overflow-y: auto;
    }

    .columns {
      flex: 1;
      align-items: stretch;
      margin-bottom: 0 !important;

      .column {
        position: relative;

        &:last-child {
          border-left: 1px solid $grey-lighter;
        }
      }
    }
  }
}
</style>
