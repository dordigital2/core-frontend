<template>
  <div>
    <nav class="navbar">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <h2>PAUL</h2>
        </router-link>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">

          <div class="navbar-item">
            <router-link to="/account/login" class="button is-primary"
              >HI</router-link
            >
          </div>
        </div>
      </div>
    </nav>

    <div class="main-view">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppBase',
  data() {
    return {
    }
  }
}
</script>

<style lang="scss">
</style>
