<template>
  <div>
    <h1 class="title is-1">Password reset</h1>

    <div class="subtitle">
      Enter a new password
    </div>

    <div class="form">
      <ValidationObserver v-slot="{ passes }" tag="form" @submit.prevent>
        <VField label="Password" rules="required">
          <b-input v-model="password" name="password" />
        </VField>

        <VField rules="required|confirmed:password" label="Confirm password">
          <b-input v-model="password_confirm"
        /></VField>

        <b-button
          native-type="submit"
          class="button button-submit is-primary"
          @click="passes(submit)"
        >
          Save
        </b-button>
      </ValidationObserver>
    </div>
  </div>
</template>

<script>
// import UserService from '@/services/user'

export default {
  name: 'AccountResetPass',
  data() {
    return {
      password: '',
      password_confirm: ''
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
