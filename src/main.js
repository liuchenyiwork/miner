import Vue from 'vue'
import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';
import './styles/theme/default-purple-theme/index.css'
import App from './App.vue'
import store from './store'
import './styles/index.less'
import VueCookies from 'vue-cookies'
import VueStorage from './plugins/vue-storage'
import ECharts from "vue-echarts";
import VueI18n from "@/utils/i18n";
import router from './router'

Vue.config.productionTip = false

Vue.use(VueCookies)

const i18n = VueI18n()

Vue.use(Element)
Vue.use(VueStorage)
Vue.component('v-chart', ECharts)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

