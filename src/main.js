import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import VbestUi from 'vbest-ui'
import 'vbest-ui/dist/vbest-ui.css'
Vue.use(VbestUi)

import global from './utils/global'

Vue.use(global)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
