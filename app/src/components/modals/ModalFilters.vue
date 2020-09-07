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
                  :disabled="
                    !(
                      (filterData[field.name] &&
                        filterData[field.name].length) ||
                      filterData[field.name] === true
                    )
                  "
                  @click="$delete(filterData, field.name)"
                  >Clear filter</b-button
                >
              </div>

              <component
                v-model="filterData[field.name]"
                :placeholder="field.display_name"
                :choices="field.choices"
                :name="field.name"
                :is="getComponent(field.field_type)"
              />
            </b-tab-item>
          </b-tabs>
        </div>
        <div class="column is-3">
          <p class="has-text-weight-semibold is-size-6">Selected filters</p>
          <br />

          <FilterDisplay :fields="table.fields" :filterData="filterData" />
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
    submit() {
      this.$store.commit('data/setFilters', this.filterData)

      // console.log(JSON.stringify(this.filterData), JSON.stringify(query))
      let query = {}

      Object.keys(this.filterData).forEach(key => {
        let e = this.filterData[key]

        if (e != null) {
          if (Array.isArray(e) && e.length) {
            query[key] = e.join(',')
          } else if (typeof e == 'object') {
            if (e.type == 'interval') {
              query[`${key}__gte`] = e.values[0]
              query[`${key}__lte`] = e.values[1]
            } else {
              query[`${key}__${e.type}`] = e.values[0]
            }
            // } else if (typeof e == 'string') query[`${key}__icontains`] = e
          } else query[`${key}__icontains`] = e.toString()
        }
      })

      const __fields = this.$route.query.__fields

      this.$router
        .push({
          query: Object.assign({ ...(__fields && { __fields }) }, query)
        })
        .catch(() => {})
        .then(() => {})

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
