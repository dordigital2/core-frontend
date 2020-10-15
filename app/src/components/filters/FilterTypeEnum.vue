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
      filterChoices: [...this.field.choices],
      innerValue: this.computeValue()
    }
  },
  mounted() {},
  methods: {
    computeValue() {
      return this.value != null ? [...this.value] : []
    },
    update() {
      this.$emit('input', this.innerValue.length ? this.innerValue : undefined)
    },
    selectAll() {
      const f = this.filterChoices.filter(e => this.innerValue.indexOf(e) == -1)
      this.innerValue = this.innerValue.concat(f)
    },
    selectNone() {
      if (this.search == null) this.innerValue = []
      else {
        this.innerValue = this.innerValue.filter(
          e => this.filterChoices.indexOf(e) == -1
        )
      }
    }
  },
  watch: {
    value() {
      this.innerValue = this.computeValue()
    },

    search(value) {
      if (value != null)
        this.filterChoices = this.field.choices.filter(
          e => e.toLowerCase().indexOf(value.toLowerCase()) != -1
        )
      else this.filterChoices = this.field.choices.slice()
    }
  }
}
</script>
