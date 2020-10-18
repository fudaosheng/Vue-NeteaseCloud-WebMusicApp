import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'utils/rem'

Vue.config.productionTip = false

import VbestUi from 'vbest-ui'
import 'vbest-ui/dist/vbest-ui.css'
Vue.use(VbestUi)

import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
  loading: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
})

import global from './utils/global'
Vue.use(global)

Vue.prototype.$bus=new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default Vue
