<template>
  <div>
    <BaseTitle title="User management" />

    <BaseCard :title="`${user.first_name} ${user.last_name}`" v-if="user">
      <template #actions>
        <div class="buttons">
          <router-link class="button is-dark" :to="{ name: 'reset-password' }">
            Reset password
          </router-link>

          <b-button
            type="is-primary"
            @click="editMode = true"
            :disabled="editMode"
            >Edit profile</b-button
          >

          
        </div>
      </template>

      <template #default>
        <div class="card-container">
          <div class="columns">
            <div class="column is-narrow avatar">
              <figure class="image">
                <img :src="userModel.avatar" />
              </figure>
            </div>

            <div class="column is-6-widescreen is-offset-1-widescreen">
              <VField label="User info" grouped>
                <b-input
                  placeholder="First name"
                  v-model="userModel.first_name"
                  :disabled="!editMode"
                />
                <b-input
                  placeholder="Last name"
                  v-model="userModel.last_name"
                  :disabled="!editMode"
                />
              </VField>

              <VField label="E-mail">
                <b-input v-model="userModel.email" :disabled="!editMode" />
              </VField>
            </div>
          </div>
        </div>
      </template>
    </BaseCard>

    <BaseCard title="User database access" v-if="user" style="width: 600px;">
      <ul class="card-list">
        <li
          v-for="(table, index) in user.tables_permissions"
          :key="`table-${table.id}`"
        >
          <div class="columns">
            <div class="column is-6" v-text="table.name"></div>
            <div class="column is-6">
              <b-select
                v-model="userModel.tables_permissions[index].permissions"
                :disabled="!editMode"
                expanded
              >
                <option
                  v-for="(p, pindex) in permissions"
                  :key="`p-${pindex}`"
                  :value="p"
                  >{{ p }}</option
                >
              </b-select>
            </div>
          </div>
        </li>
      </ul>
    </BaseCard>
  </div>
</template>

<script>
import UserService from '@/services/user'
import { mapState } from 'vuex'

export default {
  name: 'UserProfile',
  data() {
    return {
      idUser: this.$route.params.idUser,
      editMode: false,
      user: null,
      userModel: {
        tables_permissions: []
      },
      permissions: UserService.getRights()
    }
  },
  computed: mapState({}),
  mounted() {
    this.getUser()
  },
  methods: {
    getUser() {
      UserService.getUser(this.idUser).then(response => {
        this.user = response
        this.userModel = { ...this.user }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  .image {
    width: 140px;
    height: 140px;
  }

  img {
    border-radius: 100%;
    background-color: $primary;
    height: 100%;
    object-fit: cover;
  }
}
</style>
