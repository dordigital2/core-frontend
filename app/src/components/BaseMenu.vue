<template>
  <b-menu class="is-size-6">
    <b-menu-list>
      <b-menu-item
        icon="monitor-screenshot"
        label="Dashboard"
        @click="goto('dashboard')"
      ></b-menu-item>
      <b-menu-item
        icon="dns-outline"
        label="Manage database"
        @click="goto('database-view')"
      ></b-menu-item
      ><b-menu-item
        icon="tune"
        label="Filtered views"
        @click="goto('filter-view')"
      ></b-menu-item>
      <b-menu-item
        icon="chart-box-outline"
        label="Charts"
        @click="goto('charts-view')"
      ></b-menu-item>
      <b-menu-item
        icon="account-details-outline"
        label="User management"
        v-if="isAdmin"
        @click="goto('users-view')"
      ></b-menu-item>

      <b-menu-item icon="application-import" :active="isActive.import">
        <template #label="props">
          <span>Import data</span>
          <b-icon
            class="menu-tick"
            :icon="props.expanded ? 'menu-up' : 'menu-down'"
          ></b-icon>
        </template>
        <b-menu-item
          label="Manual"
          @click="goto('table-import', { query: { manual: true } })"
        ></b-menu-item>
      </b-menu-item>

      <b-menu-item icon="cog" :active="isActive.plugins">
        <template #label="props">
          <span>Plugins</span>
          <b-icon
            class="menu-tick"
            :icon="props.expanded ? 'menu-up' : 'menu-down'"
          ></b-icon>
        </template>
        <b-menu-item
          label="Mailchimp"
          @click="goto('plugin-view', { params: { plugin: 'mailchimp' } })"
        ></b-menu-item>
        <b-menu-item
          label="Woocommerce"
          @click="goto('plugin-view', { params: { plugin: 'woocommerce' } })"
        ></b-menu-item>
      </b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script>
export default {
  name: 'BaseMenu',
  props: {
    isAdmin: Boolean
  },
  data() {
    return {
      isActive: {
        plugins: false,
        import: false
      }
    }
  },
  methods: {
    goto(name, opts) {
      this.$router.push({ name, ...opts }).catch(() => {})
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

    span:not(.icon) {
      flex-grow: 1;
    }

    .icon {
      font-size: $size-3;
      &:not(.menu-tick) {
        margin-right: 16px;
      }
    }

    li ul {
      padding-left: 28px;
      margin-top: 0;
      // border-left: 0;
    }
  }
}
</style>
