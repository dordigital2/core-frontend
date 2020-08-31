<template>
  <b-menu class="is-size-6">
    <b-menu-list>
      <b-menu-item
        size="is-normal"
        icon="chart-box-outline"
        label="Dashboard"
        @click="$router.push('/app/dashboard').catch(() => {})"
      ></b-menu-item>
      <b-menu-item
        size="is-normal"
        icon="dns-outline"
        label="Manage database"
        @click="$router.push('/app/database-view').catch(() => {})"
      ></b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script>
export default {
  name: 'BaseMenu',
  components: {},
  data() {
    return {
      // isActive: false
    }
  }
}
</script>

<style scoped lang="scss">
.menu {
  position: fixed;
  width: 264px;
  background-color: $blue;
  font-size: $size-6;
  padding: 12px 15px 36px;
  border-radius: $radius;

  /deep/ .menu-list {
    a {
      display: flex;
      align-items: center;
      padding: 12px 7px;
    }

    .icon {
      margin-right: 16px;
      font-size: $size-3;
    }
  }
}
</style>
