<template>
  <div>
    <ActionButtonView :path="'view-table/' + props.row.entries" />
    <ActionButtonArchive />
  </div>
</template>

<script>
import ActionButtonArchive from './ActionButtonArchive'
import ActionButtonView from './ActionButtonView'

export default {
  components: {
    ActionButtonView,
    ActionButtonArchive
  },
  props: {
    props: Object
  }
}
</script>
