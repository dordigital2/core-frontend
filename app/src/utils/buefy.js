import config from 'buefy/src/utils/config'
import IconMdi from '@/components/IconMdi'

import {
  Button,
  Table,
  Input,
  Checkbox,
  Snackbar,
  Toast,
  Dropdown,
  Pagination,
  Field,
  Datepicker,
  Tabs,
  Modal,
  Icon,
  Loading,
  Select,
  Upload,
  Dialog,
  Tooltip
} from 'buefy/src/components'

const MyBuefy = {
  install(Vue) {
    // Options
    config.defaultTrapFocus = true
    config.defaultIconComponent = 'icon-mdi'
    config.defaultIconPack = 'mdi'

    config.customIconPacks = {
      mdi: {
        iconPrefix: '',
        internalIcons: {
          // 'check': 'checkmark',
          // 'check-circle': 'checkmark-circle-outline',
          'alert-circle': 'alert-circle-outline'
          // 'chevron-right': 'arrow-forward',
          // 'chevron-left': 'arrow-back',
          // 'chevron-down': 'arrow-down',
          // 'menu-down': 'arrow-dropdown',
          // 'menu-up': 'arrow-dropup',
        }
      }
    }

    config.defaultFirstDayOfWeek = 1
    config.defaultDayNames = ['D', 'L', 'M', 'M', 'J', 'V', 'S']
    config.defaultMonthNames = [
      'Ianuarie',
      'Februarie',
      'Martie',
      'Aprilie',
      'Mai',
      'Iunie',
      'Iulie',
      'August',
      'Septembrie',
      'Octombrie',
      'Noiembrie',
      'Decembrie'
    ]

    config.defaultDateFormatter = date => {
      if (Array.isArray(date)) {
        return date.map(e => e.toLocaleDateString('ro-RO')).join('—')
      }

      return date.toLocaleDateString('ro-RO')
    }

    // config.defaultDateParser = (date) => new Date(date.replace('.', '-'))

    config.defaultNoticeQueue = true
    config.defaultToastDuration = 3000
    // config.defaultToastPosition = 'is-bottom'
    config.defaultInputHasCounter = false
    config.defaultUseHtml5Validation = false
    config.defaultDialogConfirmText = 'Confirmă'
    config.defaultDialogCancelText = 'Înapoi'
    // config.defaultModalCanCancel = false

    // Components
    Vue.use(Button)
    Vue.use(Input)
    Vue.use(Checkbox)
    Vue.use(Toast)
    Vue.use(Dropdown)
    Vue.use(Pagination)
    Vue.use(Snackbar)
    Vue.use(Datepicker)
    Vue.use(Field)
    Vue.use(Tabs)
    Vue.use(Modal)
    Vue.use(Icon)
    Vue.use(Table)
    Vue.use(Loading)
    Vue.use(Select)
    Vue.use(Upload)
    Vue.use(Dialog)
    Vue.use(Tooltip)

    Vue.component('icon-mdi', IconMdi)
  }
}

export default MyBuefy
