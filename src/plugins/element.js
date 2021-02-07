import Vue from 'vue'
import { Message, Dialog, Button, Input, Switch, Link, Row, Col, Notification, Popover } from 'element-ui'
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Link)
Vue.use(Row)
Vue.use(Col)
Vue.use(Popover)
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
