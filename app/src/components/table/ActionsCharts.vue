<template>
  <div>
    <ActionButtonGoto icon="eye-outline" :path="'chart-view/' + props.id" />

    <ActionButtonGoto
      icon="square-edit-outline"
      :path="'chart-edit/' + props.id"
    />

    <ActionButtonDelete
      dialogTitle="Do you wish to delete this table?"
      dialogMessage="This operation permanently removes all the entries of this table. Please check the data before proceeding."
      @on-confirm="$store.dispatch('data/deleteChart', props.id)"
    />
  </div>
</template>

<script>
import ActionButtonDelete from './ActionButtonDelete'
import ActionButtonGoto from './ActionButtonGoto'

export default {
  components: {
    ActionButtonDelete,
    ActionButtonGoto
  },
  props: {
    props: Object
  }
}
</script>
