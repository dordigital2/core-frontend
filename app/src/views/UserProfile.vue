<template>
  <div>
    <BaseTitle title="User management" />

    <BaseCard
      :title="`${user.first_name} ${user.last_name}`"
      v-if="user && activeUser"
    >
      <template #actions>
        <div class="buttons">
          <router-link
            v-if="user.id === activeUser.id"
            class="button is-dark"
            :to="{ name: 'change-password' }"
          >
            Change password
          </router-link>
        </div>
      </template>

      <template #footer>
        <b-button type="is-primary" @click="save(false)">Save changes</b-button>
      </template>

      <template #default>
        <div class="card-container">
          <b-loading :is-full-page="false" v-model="loading.profile" />

          <div class="columns">
            <div class="column is-narrow avatar">
              <figure class="image">
                <img :src="userModel.avatar" />
              </figure>
            </div>

            <div class="column is-6-widescreen is-offset-1-widescreen">
              <fieldset>
                <VField label="User info" grouped>
                  <b-input
                    placeholder="First name"
                    v-model="userModel.first_name"
                  />
                  <b-input
                    placeholder="Last name"
                    v-model="userModel.last_name"
                  />
                </VField>

                <VField label="E-mail" rules="required">
                  <b-input v-model="userModel.email" />
                </VField>

                <VField label="Change avatar">
                  <div class="file is-right is-dark is-fullwidth">
                    <b-upload v-model="userModel.file" expanded>
                      <span class="file-cta">
                        <span class="file-label">Browse</span>
                      </span>
                      <span class="file-name">
                        <span v-if="userModel.file">{{
                          userModel.file.name
                        }}</span>
                      </span>
                    </b-upload>
                  </div>
                </VField>
              </fieldset>
            </div>
          </div>
        </div>
      </template>
    </BaseCard>

    <BaseCard
      title="User database access"
      v-if="user && activeUser && activeUser.is_admin"
      style="width: 600px;"
    >
      <template #footer>
        <b-button type="is-primary" @click="save(true)">Save changes</b-button>
      </template>
      <template #default>
        <b-loading :is-full-page="false" v-model="loading.permissions" />
        <fieldset>
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
        </fieldset>
      </template>
    </BaseCard>
  </div>
</template>

<script>
import UserService from '@/services/user'
import { ToastService } from '@/services/buefy'
import { mapState } from 'vuex'

export default {
  name: 'UserProfile',
  data() {
    return {
      file: null,
      idUser: this.$route.params.idUser,
      editMode: false,
      user: null,
      userModel: {
        file: null,
        tables_permissions: []
      },
      permissions: UserService.getRights(),
      loading: {
        profile: false,
        permissions: false
      }
    }
  },
  computed: mapState({
    activeUser: state => state.user
  }),
  mounted() {
    this.getUser()
  },
  methods: {
    getUser() {
      UserService.getUser(this.idUser).then(response => {
        this.user = response
        this.userModel = { ...this.user, file: null }
      })
    },

    save(patch) {
      if (patch) {
        this.loading.permissions = true
        UserService.patchUser(this.userModel.id, {
          tables_permissions: this.userModel.tables_permissions
        })
          .then(() => {
            this.loading.permissions = false
            ToastService.open('User permissions have been updated')
          })
          .catch(() => {
            this.loading.permissions = false
          })
      } else {
        this.loading.profile = true
        const formData = new FormData()
        formData.append('avatar', this.userModel.file)
        formData.append('first_name', this.userModel.first_name)
        formData.append('last_name', this.userModel.last_name)
        formData.append('email', this.userModel.email)

        UserService.putUser(this.userModel.id, formData)
          .then(() => {
            this.loading.profile = false
            ToastService.open('User profile has been updated')
          })
          .catch(() => {
            this.loading.profile = false
          })
      }
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
    background-color: $grey;
    height: 100%;
    object-fit: cover;
  }
}
</style>
