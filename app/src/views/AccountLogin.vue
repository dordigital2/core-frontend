<template>
  <div>
    <h1 class="title is-1">Log in!!</h1>

    <div class="subtitle">
      Enter your login credentials
    </div>

    <div class="form">
      <ValidationObserver v-slot="{ passes }" tag="form" @submit.prevent>
        <VField label="Email" rules="required">
          <b-input v-model="username" />
        </VField>

        <VField label="Password" rules="required">
          <b-input v-model="password" type="password" />
        </VField>
        
        <div class="field">
          <b-button
            native-type="submit"
            class="button-submit is-primary"
            @click="passes(submit)"
          >
            Log In
          </b-button>
        </div>

        <div class="field">
          Not registered yet?
          <router-link :to="{ name: 'register' }"
            >Create an account</router-link
          >
        </div>
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
