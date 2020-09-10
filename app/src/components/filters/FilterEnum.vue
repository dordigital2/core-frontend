<template>
  <div>
    <div class="is-size-6">
      <b-input
        v-model="search"
        placeholder="Search"
        icon-right="close"
        icon-right-clickable
        @icon-right-click="search = null"
      />
      <a href="#" @click.prevent="selectAll">Select all</a> |
      <a href="#" @click.prevent="selectNone">Select none</a>
    </div>
    <br />

    <div class="checkbox-list is-3">
      <b-checkbox
        v-for="(choice, index) in filterChoices"
        :key="index"
        :native-value="choice"
        v-model="innerValue"
        >{{ choice }}</b-checkbox
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    choices: Array,
    value: Array
  },
  data() {
    return {
      search: null,
      filterChoices: this.choices,
      innerValue: this.value != null ? this.value : []
    }
  },
  methods: {
    selectAll() {
      this.innerValue = [...this.filterChoices]
    },
    selectNone() {
      if (this.search == null) this.innerValue = []
      else {
        let elem = this.innerValue.slice()
        elem = elem.filter(e => this.filterChoices.indexOf(e) == -1)
        this.innerValue = elem
      }
    }
  },
  watch: {
    innerValue(input) {
      this.$emit('input', input.length ? input : undefined)
    },

    value(input) {
      this.innerValue = input != null ? input : []
    },

    search(value) {
      if (value != null)
        this.filterChoices = this.choices.filter(
          e => e.toLowerCase().indexOf(value.toLowerCase()) != -1
        )
      else this.filterChoices = this.choices
    }
  }
}
</script>
