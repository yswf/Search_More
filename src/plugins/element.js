import Vue from 'vue'
import { Message, Dialog, Button, Table, TableColumn, Switch, Link, Row, Col, Notification } from 'element-ui'
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Link)
Vue.use(Row)
Vue.use(Col)
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
