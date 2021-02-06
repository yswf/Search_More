import Vue from 'vue'
import { Message, Dialog, Button, Input, Switch, Link, Row, Col, Notification } from 'element-ui'
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Link)
Vue.use(Row)
Vue.use(Col)
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
