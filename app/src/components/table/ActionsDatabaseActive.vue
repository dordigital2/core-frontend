<template>
  <div>
    <!-- <pre>{{props.user_permissions}}</pre> -->
    <ActionButtonGoto v-if="props.user_permissions.indexOf('view_table') != -1" icon="eye-outline" :path="'table-view/' + props.id" />

    <ActionButtonGoto
      v-if="props.user_permissions.indexOf('change_table') != -1"
      icon="square-edit-outline"
      :path="'table-edit/' + props.id"
    />

    <ActionButtonArchive :idTable="props.id" />
    <ActionButtonDelete
      v-if="props.user_permissions.indexOf('delete_table') != -1"
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
