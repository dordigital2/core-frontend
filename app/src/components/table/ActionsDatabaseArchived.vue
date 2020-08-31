<template>
  <div>
    <ActionButtonGoto :path="'table-view/' + props.id" />
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
