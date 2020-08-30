<template>
  <router-link :to="path">
    <b-icon icon="eye-outline" />
  </router-link>
</template>

<script>
export default {
  props: {
    path: String
  }
}
</script>
