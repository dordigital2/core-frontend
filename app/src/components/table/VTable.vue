<template>
  <b-table :data="data">
    <template v-for="column in columns">
      <b-table-column :key="column.id || column.field" v-bind="column">
        <template v-slot="props">
          <template v-if="column.component">
            <component :is="column.component" v-bind="{ props }"></component>
          </template>

          <template v-else-if="column.filter">
            {{ $options.filters[column.filter](props.row[column.field]) }}
          </template>

          <template v-else>
            {{ props.row[column.field] }}
          </template>
        </template>
      </b-table-column>
    </template>

    <template slot="empty">
      <p class="has-text-centered">
        No data to display.
      </p>
    </template>
  </b-table>
</template>

<script>
import ActionsDatabaseArchived from './ActionsDatabaseArchived'
import ActionsDatabaseActive from './ActionsDatabaseActive'
import OwnerLink from './OwnerLink'

export default {
  components: { ActionsDatabaseArchived, ActionsDatabaseActive, OwnerLink },
  data() {
    return {}
  },
  props: {
    data: Array,
    columns: Array,
    actionComponent: String
  }
}
</script>

<style scoped lang="scss"></style>
