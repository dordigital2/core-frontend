<template>
  <div>
    <VField class="field-group">
      <b-select placeholder="Day" v-model="model.day">
        <option
          v-for="(item, key) in options.day"
          :key="key"
          :value="key"
          v-text="item"
        />
      </b-select>

      <b-input class="control-input" v-model="model.separator1" maxlength="1" />

      <b-select placeholder="Month" v-model="model.month">
        <option
          v-for="(item, key) in options.month"
          :key="key"
          :value="key"
          v-text="item"
        />
      </b-select>

      <b-input class="control-input" v-model="model.separator2" maxlength="1" />

      <b-select placeholder="Year" v-model="model.year">
        <option
          v-for="(item, key) in options.year"
          :key="key"
          :value="key"
          v-text="item"
        />
      </b-select>
    </VField>

    <VField label="Drag them in the desired order">
      <draggable v-model="dateList" draggable=".item" class="draggable">
        <span v-if="model.day" class="item" v-text="options.day[model.day]" />
        <span v-if="model.separator1" class="item" v-text="model.separator1" />
        <span
          v-if="model.month"
          class="item"
          v-text="options.month[model.month]"
        />
        <span v-if="model.separator2" class="item" v-text="model.separator2" />
        <span v-if="model.year" class="item" v-text="options.year[model.year]" />
      </draggable>
    </VField>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  props: {
    value: String
  },
  components: {
    draggable
  },
  data() {
    return {
      options: {
        day: {
          '': 'None',
          '%d': '01',
          '%w': '1'
        },
        month: {
          '': 'None',
          '%b': 'Jan',
          '%B': 'January',
          '%m': '01'
        },
        year: {
          '': 'None',
          '%y': '99',
          '%Y': '1999'
        }
      },
      innerValue: this.value,
      dateList: null,
      model: {
        day: '%d',
        separator1: '/',
        separator2: '/',
        month: '%b',
        year: '%Y'
      }
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

<style lang="scss" scoped>
.field-group {
  .control-input {
    margin-right: 0 !important;
    width: 24px;
    
    /deep/ .input {
      border-color: $grey-select;
    }
  }
}

.draggable {
  margin-top: 16px;

  .item {
    background-color: $grey-select;
    padding: 8px;

    border-radius: $radius-small;
    margin-right: 8px;
    user-select: none;
    cursor: grab;

    &:hover {
      background-color: $grey-dark;
    }
  }
}
</style>
