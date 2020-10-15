<template>
  <div class="filter-component">
    <div class="filter-body">
      <div class="is-size-6">
        <b-input
          v-model="search"
          placeholder="Search"
          icon-right="close"
          icon-right-clickable
          @icon-right-click="search = null"
        />
        <a @click.prevent="selectAll">Select all</a> |
        <a @click.prevent="selectNone">Select none</a>
      </div>

      <div class="checkbox-list is-3">
        <VField rules="required">
          <b-checkbox
            v-for="(choice, index) in filterChoices"
            :key="index"
            :native-value="choice"
            v-model="innerValue"
          >
            {{ choice }}
          </b-checkbox>
        </VField>
      </div>
    </div>

    <slot v-bind="{ update }"></slot>
  </div>
</template>

<script>
export default {
  props: {
    field: Object,
    value: Array,
    autoupdate: Boolean
  },
  data() {
    return {
      search: null,
      filterChoices: this.field.choices.slice(),
      innerValue: []
    }
  },
  mounted() {
    if (this.autoupdate) {
      this.$watch('innerValue', function() {
        this.update()
      })
    }
  },
  methods: {
    update() {
      this.$emit(
        'input',
        this.innerValue.length ? this.innerValue.slice() : undefined
      )
    },
    selectAll() {
      this.innerValue = this.innerValue.concat(this.filterChoices)
    },
    selectNone() {
      if (this.search == null) this.innerValue = []
      else {
        this.innerValue = this.innerValue.filter(e => {
          return this.filterChoices.indexOf(e) == -1
        })
      }
    }
  },
  watch: {
    value(input) {
      // console.log('value changed')
      this.innerValue = input != null ? input.slice() : []
    },

    search(value) {
      if (value != null)
        this.filterChoices = this.choices.filter(
          e => e.toLowerCase().indexOf(value.toLowerCase()) != -1
        )
      else this.filterChoices = this.choices.slice()
    }
  }
}
</script>
