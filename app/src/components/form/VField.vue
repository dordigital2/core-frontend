<template>
  <ValidationProvider
    :name="name || label"
    :rules="rules"
    v-slot="{ errors }"
    :slim="column == null"
    :class="column != null ? `column ${column}` : null"
    tag="div"
  >
    <b-field
      :type="{ 'is-danger': errors[0] }"
      :message="errors.length ? errors : null"
    >
      <template slot="label" v-if="label">
        {{ label }}
        <b-tooltip v-if="labelInfo" type="is-dark" :label="labelInfo">
          <b-icon icon="question-circle" size="is-small"></b-icon>
        </b-tooltip>
      </template>

      <div class="description" v-if="description">{{ description }}</div>

      <slot></slot>
      <slot name="footer"></slot>
    </b-field>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationProvider
  },
  props: {
    rules: {
      type: [Object, String],
      default: 'required'
    },
    name: String,
    label: String,
    column: String,
    description: String,
    labelInfo: String
  }
}
</script>
