<template>
  <a href="#" class="has-text-danger" @click.prevent="deleteAction">
    <b-icon icon="trash-can-outline" />
  </a>
</template>

<script>
export default {
  props: {
    path: String,
    dialogTitle: String,
    dialogMessage: String,
    storeAction: String,
    data: [Object, Number, String]
  },
  methods: {
    deleteAction() {
      this.$buefy.dialog.confirm({
        title: this.dialogTitle,
        message: this.dialogMessage,
        type: 'is-danger',
        onConfirm: () => {
          this.$store.dispatch(this.storeAction, this.data)
        },
        confirmText: 'Delete'
      })
    }
  }
}
</script>
