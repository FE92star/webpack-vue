import Vue from 'vue'
import App from './App.vue'
import Ajax from './components/Ajax/index'

Vue.config.productionTip = false

Vue.use(Ajax)

new Vue({
	render: h => h(App)
}).$mount('#app')
