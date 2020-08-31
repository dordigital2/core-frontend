<template>
  <div>
    <ActionButtonGoto
      icon="eye-outline"
      :path="{ name: 'entity-view', params: { idEntity: props.id } }"
    />

    <ActionButtonGoto
      icon="square-edit-outline"
      :path="'entity-edit/' + props.id"
    />

    <ActionButtonDelete />
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
