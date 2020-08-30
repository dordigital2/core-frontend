<template>
  <div>
    <ActionButtonView :path="'view-table/' + props.row.entries" />
    <ActionButtonDownload />
  </div>
</template>

<script>
import ActionButtonDownload from './ActionButtonDownload'
import ActionButtonView from './ActionButtonView'

export default {
  components: {
    ActionButtonView,
    ActionButtonDownload
  },
  props: {
    props: Object
  }
}
</script>
