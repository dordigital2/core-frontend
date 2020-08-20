<template>
  <div>
    <h1 class="title is-1">Log in</h1>

    <div class="subtitle">
      Introduceti datele de logare
    </div>

    <div class="form">
      <ValidationObserver v-slot="{ passes }" tag="form" @submit.prevent>
        <VInput v-model="username" label="E-mail" />
        <VInput v-model="password" label="Parola" type="password" />

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
