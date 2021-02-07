import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueClipboard from 'vue-clipboard2'
import './assets/css/global.css'
import './assets/font/iconfont.css'

// 导入NProgress包和css
import NProgress from 'nprogress'
// 配置axios
axios.defaults.timeout = 2000
axios.interceptors.request.use(config => {
  NProgress.start()
  // 必须return
  return config
})
// 在response拦截器中隐藏进度条
axios.interceptors.response.use(config => {
  NProgress.done()
  return config
})
// 使用axios
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(VueClipboard)
new Vue({
  render: h => h(App)
}).$mount('#app')
