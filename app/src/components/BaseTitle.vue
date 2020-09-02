<template>
  <header class="main-header">
    <div class="back-button" v-if="hasBackButton">
      <button class="button" @click="$router.go(-1)">
        <b-icon icon="arrow-left" /><span>Back</span>
      </button>
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
