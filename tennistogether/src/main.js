import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import Https from './https'
import './styles.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import VComponents from './components'
// import VMdDateRangePicker from 'v-md-date-range-picker'
require('./plugins/date-picker')
// Vue.use(VMdDateRangePicker)
Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.prototype.$https = new Https()

// Object.entries(VComponents).forEach(([name, component]) => {
//   Vue.component(name, component)
// })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
