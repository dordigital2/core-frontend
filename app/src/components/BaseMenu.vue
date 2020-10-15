<template>
  <b-menu class="is-size-6" id="base-menu">
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