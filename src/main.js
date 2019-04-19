import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
// 引入global.css全局样式控制文件
import './assets/style/base.css'
// 引入“图标”css样式文件
import './assets/fonts/iconfont.css'
// 导入element-ui组件库并注册给vue
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
// axios请求根地址
axios.defaults.baseURL = 'http://192.168.1.144/ad/client/'

Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
