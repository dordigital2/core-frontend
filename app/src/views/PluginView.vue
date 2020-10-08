<template>
  <div>
    <BaseTitle
      :title="`Manage plug-in ${$route.query.type}`"
      :hasBackButton="false"
    />

    <BaseCard title="Tasks" v-if="tasks"
      ><template #actions>
        <router-link
          :to="{ name: 'plugin-task-edit' }"
          class="button is-primary"
        >
          Add new task
        </router-link>
      </template>

      <BaseTableAsync
        :table="taskTable"
        :tableEntries="tasks"
        tableActionsComponent="ActionsPlugin"
        @update="getTasks"
      />
    </BaseCard>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
import PluginService from '@/services/plugins'

export default {
  name: 'PluginView',
  components: {},
  data() {
    return {
      tasks: null,
      taskTable: {
        id: 'tasks',
        default_fields: [
          'name',
          'task_type',
          'last_run_date',
          'last_edit_date',
          'last_edit_user.username'
        ],
        fields: [
          {
            name: 'name',
            display_name: 'Task name'
          },
          {
            name: 'task_type',
            display_name: 'Type'
          },
          {
            name: 'last_run_date',
            display_name: 'Last run date',
            field_type: 'date'
          },
          {
            name: 'last_edit_date',
            display_name: 'Last edit date',
            field_type: 'date'
          },
          {
            name: 'last_edit_user.username',
            display_name: 'Last edit made by'
          }
        ]
      }
    }
  },
  computed: {
    type: function() {
      return this.$route.params.plugin
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.PluginService = new PluginService(this.type)
      this.getTasks()
    },
    getTasks() {
      this.PluginService.getTasks().then(response => {
        this.tasks = response
      })
    }
  },
  watch: {
    type() {
      this.init()
    }
  }
}
</script>
