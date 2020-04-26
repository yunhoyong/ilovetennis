import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import Https from './https'
import store from './store'
import './styles.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import VMdDateRangePicker from 'v-md-date-range-picker'
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from './assets/icons/icons.js'
require('./plugins/date-picker')
// Vue.use(VMdDateRangePicker)
Vue.use(BootstrapVue)
Vue.use(CoreuiVue)
Vue.config.productionTip = false
Vue.prototype.$https = new Https()

new Vue({
  router,
  icons,
  store,
  render: h => h(App)
}).$mount('#app')
