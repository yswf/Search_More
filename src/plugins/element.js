import Vue from 'vue'
import { Message, Dialog, Button, Input, Switch, Link, Row, Col, Notification, Popover, Card, Divider, Image, Collapse, CollapseItem } from 'element-ui'
Vue.use(Dialog)
Vue.use(Button)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Link)
Vue.use(Row)
Vue.use(Col)
Vue.use(Popover)
Vue.use(Card)
Vue.use(Divider)
Vue.use(Image)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification
