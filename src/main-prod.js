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
function successRes (config) {
  NProgress.done()
  return config
}
axios.interceptors.response.use(successRes, function axiosRetryInterceptor (err) {
  var config = err.config
  // If config does not exist or the retry option is not set, reject
  if (!config || !config.retry) return Promise.reject(err)

  // Set the variable for keeping track of the retry count
  config.__retryCount = config.__retryCount || 0

  // Check if we've maxed out the total number of retries
  if (config.__retryCount >= config.retry) {
    // Reject with the error
    return Promise.reject(err)
  }

  // Increase the retry count
  config.__retryCount += 1

  // Create new promise to handle exponential backoff
  var backoff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve()
    }, config.retryDelay || 1)
  })
  NProgress.done()
  // Return the promise in which recalls axios to retry the request
  return backoff.then(function () {
    return axios(config)
  })
})
// 使用axios
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(VueClipboard)
new Vue({
  render: h => h(App)
}).$mount('#app')
