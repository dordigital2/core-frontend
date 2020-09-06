<template>
  <div v-if="table && entity">
    <BaseTitle :title="'Entity view'" />

    <BaseCard :title="`Table – ${table.name}`">
      <BaseTable :data="[entity]" :columns="table.fields" />
    </BaseCard>

    <TableEntityCard
      v-for="(link, index) in tableLinks"
      :key="`tableLink${index}`"
      :idTable="link.idLinkTable"
      :entity="link.entity"
      :query="link.query"
    />

    <TableEntityLinkCard :idTable="Number(idTable)" @input="addLinkTable" />
  </div>
</template>

<script>
import TableEntityCard from '@/components/table/TableEntityCard'
import TableEntityLinkCard from '@/components/table/TableEntityLinkCard'
import { TableService } from '@/services/data'
import { mapState } from 'vuex'

export default {
  name: 'TableEntityView',
  components: { TableEntityCard, TableEntityLinkCard },
  data() {
    return {
      idTable: Number(this.$route.params.idTable),
      entity: null,
      tableLinks: []
    }
  },
  computed: mapState({
    table: function(state) {
      return state.data.table[this.idTable]
    }
  }),
  mounted() {
    if (!this.table) this.$store.dispatch('data/getTable', this.idTable)

    this.getEntity()
  },
  methods: {
    getEntity() {
      TableService.getEntity(this.idTable, this.$route.params.idEntity).then(
        response => {
          this.entity = response
          this.tableLinks.push({
            idLinkTable: this.idTable,
            entity: response,
            table: this.table
          })
        }
      )
    },
    addLinkTable({ sourceField, idLinkTable, linkField }) {
      const query = {
        __fields: 'ALL',
        [linkField]: this.entity.data[sourceField]
      }

      this.tableLinks.push({ idLinkTable, query })
    }
  }
}
</script>
