<template>
  <div>
    <ActionButtonGoto icon="eye-outline" :path="'table-view/' + props.id" />

    <ActionButtonGoto
      icon="square-edit-outline"
      :path="'table-edit/' + props.id"
    />

    <ActionButtonArchive />
    <ActionButtonDelete />
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
