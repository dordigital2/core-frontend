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
import UserService from '@/services/user'

export default {
  name: 'Users',
  data() {
    return {
      users: null,
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
  mounted() {
    this.getUsers()
  },
  methods: {
    getUsers(query) {
      UserService.getUsers(query).then(response => {
        this.users = response
      })
    }
  }
}
</script>
