<template>
  <ValidationProvider
    v-slot="{ errors }"
    :name="name || label"
    :rules="rules"
    :slim="column == null"
    :class="column != null ? `column ${column}` : null"
    tag="div"
  >
    <b-field
      :type="{ 'is-danger': errors[0] }"
      :message="errors.length ? errors : ''"
      :horizontal="$attrs.horizontal"
    >
      <template slot="label" v-if="label">
        {{ label }}
        <b-tooltip v-if="labelInfo" type="is-dark" :label="labelInfo">
          <b-icon icon="question-circle" size="is-small"></b-icon>
        </b-tooltip>
      </template>

      <div class="description" v-if="description">{{ description }}</div>

      <b-input
        v-model="innerValue"
        v-bind="{ type, placeholder, disabled, readonly, customClass }"
      ></b-input>
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
    type: String,
    readonly: Boolean,
    disabled: String,
    value: null,
    column: String,
    description: String,
    customClass: String,
    labelInfo: String,
    placeholder: String
  },
  data() {
    return {
      innerValue: this.value ? this.value : null
    }
  },
  watch: {
    innerValue(input) {
      this.$emit('input', input)
    },
    value(input) {
      this.innerValue = input
    }
  }
}
</script>
