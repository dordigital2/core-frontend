<template>
  <header>
    <div v-if="hasBackButton">
      <button class="button" @click="$router.go(-1)">Back</button>
    </div>
    <p class="title">{{ title }}</p>
  </header>
</template>

<script>
export default {
  name: 'BaseTitle',
  components: {},
  props: {
    title: String,
    hasBackButton: {
      type: Boolean,
      default: true
    }
  }
}
</script>
