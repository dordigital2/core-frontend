<template>
  <div>
    <BaseTitle title="User management" :hasBackButton="false" />

    <BaseCard title="Users on the platform" v-if="users">
      <template #default>
        <BaseTableAsync
          :table="userTable"
          :tableEntries="users"
          tableActionsComponent="ActionsUser"
          @update="getUsers"
        />
      </template>
    </BaseCard>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Users',
  data() {
    return {
      userTable: {
        id: 'users',
        default_fields: ['username', 'first_name', 'last_name', 'email'],
        fields: [
          {
            name: 'username',
            component: 'FieldRouterLink',
            props: { route: 'user-profile', param: 'idUser' },
            display_name: 'Username'
          },
          {
            name: 'first_name',
            display_name: 'First name'
          },
          {
            name: 'last_name',
            display_name: 'Last name'
          },
          {
            name: 'email',
            display_name: 'E-mail address'
          }
        ]
      }
    }
  },
  computed: mapState({
    users: state => state.data.users
  }),
  mounted() {
    this.getUsers()
  },
  methods: {
    getUsers(query) {
      this.$store.dispatch('data/getUsers', query)
    }
  }
}
</script>
