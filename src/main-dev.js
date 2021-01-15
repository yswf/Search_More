import Vue from 'vue'
import App from './App.vue'
import { VueJsonp } from 'vue-jsonp'
import './assets/css/global.css'
import './assets/font/iconfont.css'

Vue.config.productionTip = false
Vue.use(VueJsonp)
new Vue({
  render: h => h(App)
}).$mount('#app')
