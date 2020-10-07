<template>
  <div class="container is-fluid">
    <nav class="navbar">
      <div class="navbar-brand">
        <router-link to="/app/dashboard" class="navbar-item">
          <h2>PAUL</h2>
        </router-link>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <router-link
            v-if="user"
            :to="{ name: 'user-profile', params: { idUser: user.id } }"
            class="navbar-item"
            v-text="user.username"
          />

          <a href="#" @click="logout()" class="navbar-item"
            ><b-icon icon="power" class="is-size-3" /> <span>Log out</span></a
          >
        </div>
      </div>
    </nav>

    <BaseMenu :isAdmin="user && user.is_admin" />

    <div class="main-view">
      <router-view />
    </div>
  </div>
</template>

<script>
import BaseMenu from '@/components/BaseMenu.vue'
import { mapState } from 'vuex'

export default {
  name: 'Base',
  components: {
    BaseMenu
  },
  data() {
    return {}
  },
  computed: mapState({
    user: state => state.user
  }),
  mounted() {
    this.$store.dispatch('getActiveUser')
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="scss" scoped>
.column-menu {
  width: 294px;
}
</style>
