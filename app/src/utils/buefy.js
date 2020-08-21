import config, { setVueInstance } from 'buefy/src/utils/config'
import IconMdi from '@/components/IconMdi'

import {
  Button,
  Input,
  Checkbox,
  Datepicker,
  Dialog,
  Dropdown,
  Field,
  Icon,
  Loading,
  Menu,
  Modal,
  Pagination,
  Select,
  Snackbar,
  Table,
  Tabs,
  Toast,
  Tooltip,
  Upload
} from 'buefy/src/components'

const MyBuefy = {
  install(Vue) {
    setVueInstance(Vue)

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
    Vue.use(Checkbox)
    Vue.use(Datepicker)
    Vue.use(Dialog)
    Vue.use(Dropdown)
    Vue.use(Field)
    Vue.use(Icon)
    Vue.use(Input)
    Vue.use(Loading)
    Vue.use(Menu)
    Vue.use(Modal)
    Vue.use(Pagination)
    Vue.use(Snackbar)
    Vue.use(Select)
    Vue.use(Table)
    Vue.use(Tabs)
    Vue.use(Toast)
    Vue.use(Tooltip)
    Vue.use(Upload)

    Vue.component('icon-mdi', IconMdi)
  }
}

export default MyBuefy
