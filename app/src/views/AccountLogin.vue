<template>
  <div>
    <h1 class="title is-1">Log in</h1>

    <div class="subtitle">
      Enter your login credentials
    </div>

    <div class="form">
      <ValidationObserver v-slot="{ passes }" tag="form" @submit.prevent>
        <VInput v-model="username" label="Email" />
        <VInput v-model="password" label="Password" type="password" />

        <b-button
          native-type="submit"
          class="button button-submit is-primary"
          @click="passes(submit)"
        >
          Log In
        </b-button>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountLogin',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    submit() {
      this.$store.dispatch('login', {
        username: this.username,
        password: this.password
      })
    }
  }
}
</script>
