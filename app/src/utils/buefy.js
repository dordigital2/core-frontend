import config, { setVueInstance } from 'buefy/src/utils/config'

import {
  Button,
  Input,
  Checkbox,
  Datepicker,
  Datetimepicker,
  Dialog,
  Dropdown,
  Field,
  Icon,
  Loading,
  Menu,
  Message,
  Modal,
  Pagination,
  Radio,
  Select,
  Snackbar,
  Switch,
  Table,
  Tag,
  Tabs,
  Taginput,
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

    // config.defaultFirstDayOfWeek = 1
    // config.defaultDayNames = ['Sun', 'L', 'M', 'M', 'J', 'V', 'S']
    // config.defaultMonthNames = [
    //   'Ianuarie',
    //   'Februarie',
    //   'Martie',
    //   'Aprilie',
    //   'Mai',
    //   'Iunie',
    //   'Iulie',
    //   'August',
    //   'Septembrie',
    //   'Octombrie',
    //   'Noiembrie',
    //   'Decembrie'
    // ]

    // config.defaultDateFormatter = date => {
    //   if (Array.isArray(date)) {
    //     return date.map(e => e.toLocaleDateString('ro-RO')).join('—')
    //   }

    //   return date.toLocaleDateString('ro-RO')
    // }

    // config.defaultDateParser = (date) => new Date(date.replace('.', '-'))

    config.defaultNoticeQueue = false
    config.defaultToastDuration = 3000
    // config.defaultToastPosition = 'is-bottom'
    config.defaultInputHasCounter = false
    config.defaultUseHtml5Validation = false
    config.defaultDialogConfirmText = 'Confirm'
    config.defaultDialogCancelText = 'Cancel'
    // config.defaultModalCanCancel = false

    // Components
    Vue.use(Button)
    Vue.use(Checkbox)
    Vue.use(Datepicker)
    Vue.use(Datetimepicker)
    Vue.use(Dialog)
    Vue.use(Dropdown)
    Vue.use(Field)
    Vue.use(Icon)
    Vue.use(Input)
    Vue.use(Loading)
    Vue.use(Menu)
    Vue.use(Message)
    Vue.use(Modal)
    Vue.use(Pagination)
    Vue.use(Radio)
    Vue.use(Snackbar)
    Vue.use(Switch)
    Vue.use(Select)
    Vue.use(Table)
    Vue.use(Tabs)
    Vue.use(Tag)
    Vue.use(Taginput)
    Vue.use(Toast)
    Vue.use(Tooltip)
    Vue.use(Upload)
  }
}

export default MyBuefy
