<template>
  <div>
    <router-link :to="'/user/' + props.row.owner.username">{{
      props.row.owner.username
    }}</router-link>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    props: Object
  }
}
</script>
