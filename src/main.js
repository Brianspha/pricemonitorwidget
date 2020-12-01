import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'

// plugins
import AtUI from 'at-ui'
import 'at-ui-style/css/at.css'
import './assets/css/main.scss'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import 'at-ui-style/css/at.css'
import './assets/css/main.scss'
import vuetify from './plugins/vuetify' // path to vuetify export
import Cryptoicon from 'vue-cryptoicon';
import VueApexCharts from "vue-apexcharts";

// widget setup
// (optional) 'Custom elements polyfill'
import 'document-register-element/build/document-register-element'
// vue-custom-element by karol-f
import vueCustomElement from 'vue-custom-element'
Vue.use(vueCustomElement)

Vue.use(AtUI)
Vue.config.productionTip = false
Vue.use(vuetify)
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);
Vue.use(Cryptoicon);

// new Vue is not needed anymore, as you're initializing the app through vue-custom-element
// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')

// use vue-custom-element
App.store = store
App.router = router
App.vuetify = vuetify;
Vue.customElement('price-monitor-widget', App)
