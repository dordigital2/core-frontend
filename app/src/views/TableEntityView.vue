<template>
  <div v-if="table && entity">
    <BaseTitle :title="'Entity view'" />

    <BaseCard :title="`Table – ${table.name}`">
      <BaseTable :data="[entity]" :columns="table.fields" />
    </BaseCard>

    <TableEntityCard
      v-for="(link, index) in tableLinks"
      :key="`tableLink${index}`"
      :table="link.table"
      :entities="link.entities"
      isEditable
    />

    <TableEntityLinkCard @input="addLinkTable" />
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
      entity: null,
      tableLinks: []
    }
  },
  computed: mapState({
    table: state => state.data.table
  }),
  mounted() {
    this.$store
      .dispatch('data/getTable', this.$route.params.idTable)
      .then(() => {
        this.getEntity()
      })
  },
  methods: {
    getEntity() {
      TableService.getEntity(
        this.$route.params.idTable,
        this.$route.params.idEntity
      ).then(response => {
        this.entity = response
        this.tableLinks.push({ table: this.table, entities: [response] })
      })
    },
    addLinkTable({ idTable, linkField, sourceField }) {
      TableService.getTable(idTable).then(response => {
        const table = response

        const query = {
          __fields: 'ALL'
        }

        query[linkField] = this.entity.data[sourceField]

        TableService.getEntries(idTable, query).then(response => {
          // console.log('getEntries', response)
          this.tableLinks.push({ table, entities: response.results })
        })
      })
    }
  }
}
</script>
