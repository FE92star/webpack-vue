import Vue from 'vue'
import App from './App.vue'
import Ajax from './components/Ajax/index'
import Baolement from './components/index'

Vue.config.productionTip = false

Vue.use(Ajax)
Vue.use(Baolement)

new Vue({
	render: h => h(App)
}).$mount('#app')
