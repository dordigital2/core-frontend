<template>
  <div>
    <ActionButtonGoto icon="eye-outline" :path="'table-view/' + props.id" />
    <ActionButtonGoto
      icon="square-edit-outline"
      :path="'table-edit/' + props.id"
    />
    <ActionButtonDelete />
    <ActionButtonDownload />
  </div>
</template>

<script>
import ActionButtonDownload from './ActionButtonDownload'
import ActionButtonGoto from './ActionButtonGoto'

export default {
  components: {
    ActionButtonGoto,
    ActionButtonDownload
  },
  props: {
    props: Object
  }
}
</script>
