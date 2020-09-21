<template>
  <div>
    <slot v-bind="{ update }"></slot>

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
      <VField rules="required">
        <b-checkbox
          v-for="(choice, index) in filterChoices"
          :key="index"
          :native-value="choice"
          v-model="innerValue"
          >{{ choice }}</b-checkbox
        >
      </VField>
    </div>

    <pre>{{innerValue}}</pre>
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
      filterChoices: this.choices.slice(),
      innerValue: []
    }
  },
  methods: {
    update() {
      // this.$emit('input', this.innerValue)
      this.$emit('input', this.innerValue.length ? this.innerValue : undefined)
    },
    selectAll() {
      this.innerValue = this.filterChoices.slice()
    },
    selectNone() {
      if (this.search == null) this.innerValue = []
      else {
        this.innerValue = this.innerValue.filter(e => {
          // console.log(this.filterChoices.indexOf(e), e)
          return this.filterChoices.indexOf(e) == -1
        })
      }
    }
  },
  watch: {
    value(input) {
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
