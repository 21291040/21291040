// eslint-disable-next-line import/no-extraneous-dependencies
import Vue from 'vue'
import App from './App.vue'
import VueGoodTable from 'vue-good-table'

import 'vue-good-table/dist/vue-good-table.min.css'
import './css/app.css'

Vue.use(VueGoodTable)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  render: h => h(App)
}).$mount('#app')
