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
          <router-link to="/" class="navbar-item">Username</router-link>

          <a href="#" @click="logout()" class="navbar-item"
            ><b-icon icon="power" class="is-size-3" /> <span>Log out</span></a
          >
        </div>
      </div>
    </nav>

    <div class="columns">
      <div class="column is-narrow">
        <BaseMenu />
      </div>
      <div class="column">
        <div class="main-view">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseMenu from '@/components/BaseMenu.vue'

export default {
  name: 'Base',
  components: {
    BaseMenu
  },
  data() {
    return {}
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>
