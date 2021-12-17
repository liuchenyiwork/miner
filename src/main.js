import Vue from 'vue'
import ElementUI from 'element-ui';
import Vuex from 'vuex'
import 'element-ui/lib/theme-chalk/index.css';
import '@/styles/index.less'
import '@/styles/theme/sky-theme/index.css'
import App from '@/App.vue'
import router from '@/router'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
