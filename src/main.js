import Vue from 'vue'
import App from './App'
import router from '@router'
import store from '@state/store'
import AuthPlugin from '@plugins/auth'
import '@components/_globals'
import '@design/index.css'

// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

Vue.use(AuthPlugin)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
