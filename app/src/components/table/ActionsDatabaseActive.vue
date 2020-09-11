<template>
  <div>
    <ActionButtonGoto icon="eye-outline" :path="'table-view/' + props.id" />

    <ActionButtonGoto
      icon="square-edit-outline"
      :path="'table-edit/' + props.id"
    />

    <ActionButtonArchive :idTable="props.id" />
    <ActionButtonDelete
      dialogTitle="Do you wish to delete this table?"
      dialogMessage="This operation permanently removes all the entries of this table. Please check the data before proceeding."
      @on-confirm="$store.dispatch('data/deleteTable', props.id)"
    />
  </div>
</template>

<script>
import ActionButtonArchive from './ActionButtonArchive'
import ActionButtonDelete from './ActionButtonDelete'
import ActionButtonGoto from './ActionButtonGoto'

export default {
  components: {
    ActionButtonArchive,
    ActionButtonDelete,
    ActionButtonGoto
  },
  props: {
    props: Object
  }
}
</script>
