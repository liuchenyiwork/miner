import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import '@/styles/theme/default-purple-theme/index.css'
import '@/styles/theme/sky-theme/index.css'
import App from '@/App.vue'
import router from '@/router'

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
