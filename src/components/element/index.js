import {
  Button,
  Input,
  PageHeader,
  Calendar,
  Form,
  FormItem,
  Col,
  TimePicker,
  Radio,
  RadioGroup,
  Select,
  Option,
  DatePicker,
  Popover,
  Dialog,
  Badge,
  Empty,
  MessageBox
} from 'element-ui'

const coms = [
  Button,
  Input,
  PageHeader,
  Calendar,
  Form,
  FormItem,
  Col,
  TimePicker,
  Radio,
  RadioGroup,
  Select,
  Option,
  DatePicker,
  Popover,
  Dialog,
  Badge,
  Empty,
  MessageBox
]

export default {
  install (Vue, options) {
    coms.map(c => {
      return Vue.component(c.name, c)
    })
  }
}
