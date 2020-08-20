<template>
  <div>
    <h1 class="title is-1">Reseteaza parola</h1>

    <div class="subtitle">
      Introduceti parola noua
    </div>

    <div class="form">
      <ValidationObserver v-slot="{ passes }" tag="form" @submit.prevent>
        <VInput v-model="password" name="password" label="Parola" />
        <VInput
          v-model="password_confirm"
          rules="required|confirmed:password"
          label="Confirmare parola"
        />

        <b-button
          native-type="submit"
          class="button button-submit is-primary"
          @click="passes(submit)"
        >
          Salveaza
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
