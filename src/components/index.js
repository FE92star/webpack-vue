import BaoButton from '@@/Basic/Button/index'

const components = [
	BaoButton
]

// 全局注册组件
const install = function (Vue) {
	if(install.installed) return
	components.map(component => Vue.component(component.name, component))
}

if(typeof window !== 'undefined' && window.Vue) {
	install(window.Vue)
}

export default {
	install,
	BaoButton
}
