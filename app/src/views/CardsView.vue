<template>
  <div>
    <BaseTitle title="Cards management" :hasBackButton="false" />

    <BaseCard title="Cards" v-if="cards"
      ><template #actions>
        <router-link :to="{ name: 'card-edit' }" class="button is-primary">
          Add new card
        </router-link>
      </template>

      <BaseTableAsync
        :table="table"
        :tableEntries="cards"
        tableActionsComponent="ActionsCards"
        @update="getCards"
      />
    </BaseCard>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CardsView',
  components: {},
  data() {
    return {
      table: {
        id: 'tasks',
        default_fields: [
          'name',
          'creation_date',
          'table',
          'owner.username',
          'show_dashboard'
        ],
        fields: [
          {
            name: 'name',
            component: 'FieldRouterLink',
            props: { route: 'card-view', param: 'idCard' },
            display_name: 'Card name'
          },
          {
            name: 'creation_date',
            field_type: 'date',
            display_name: 'Creation date'
          },
          {
            name: 'table',
            display_name: 'Table',
            component: 'FieldTagList'
          },
          {
            name: 'owner.username',
            display_name: 'Created by'
          },
          {
            name: 'show_dashboard',
            display_name: 'Show in dashboard',
            component: 'FieldCheckbox',
            centered: true,
            sortable: false,
            props: {
              type: 'cards',
              action: 'add-to-dashboard'
            }
          },
          {
            name: 'actions',
            display_name: ' ',
            component: 'ActionsCards',
            custom_class: 'actions',
            sortable: false,
            sticky: true
          }
        ]
      }
    }
  },
  computed: mapState({
    cards: state => state.data.cards
  }),
  mounted() {
    this.$store.commit('data/setCard', null)
    this.getCards()
  },
  methods: {
    getCards(query) {
      this.$store.dispatch('data/getCards', query)
    }
  }
}
</script>
