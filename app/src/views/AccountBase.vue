<template>
  <div>
    <nav class="navbar">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <h2>CORE</h2>
        </router-link>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <router-link :to="{ name: 'forgot-password' }" class="navbar-item"
            >Forgot password?</router-link
          >

          <div class="navbar-item">
            <router-link :to="{ name: 'login' }" class="button is-primary"
              >Log in</router-link
            >
          </div>
        </div>
      </div>
    </nav>

    <div class="form-view">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountBase',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  mounted() {
    document.body.classList.add('account-view')
  },
  destroyed() {
    document.body.classList.remove('account-view')
  }
}
</script>

<style lang="scss">
@import '../assets/style/views/AccountBase';
</style>
