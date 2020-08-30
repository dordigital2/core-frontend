<template>
  <div>
    <h1 class="title is-1">Forgot password?</h1>

    <div class="subtitle">
      Enter your email address to receive further instructions
    </div>

    <div class="form">
      <ValidationObserver v-slot="{ passes }" tag="form" @submit.prevent>
        <VInput
          v-model="email"
          label="Email"
          placeholder="e@mail.com"
          rules="required|email"
        />

        <b-button
          native-type="submit"
          class="button button-submit is-primary"
          @click="passes(submit)"
        >
          Send request
        </b-button>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
// import UserService from '@/services/user'

export default {
  name: 'AccountForgotPass',
  data() {
    return {
      email: ''
    }
  },
  methods: {
    submit() {
      console.log('submit')
    }
  }
}
</script>

<style scoped lang="scss"></style>
