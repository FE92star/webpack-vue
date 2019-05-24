import ajax from './src/ajax'
/**
 * @param {*} options ajax 传参对象
 * 导出的ajaxPlugin允许带一个默认配置 本地的优先级高于默认配置
 */
const ajaxPlugin = {}
ajaxPlugin.install = function (Vue, options = {}) {
  Vue.prototype.$ajax = (options = {}) => {
    if (Object.prototype.toString.call(options) === '[object Object]') {
      if (ajaxPlugin.initOptions && typeof ajaxPlugin.initOptions === 'object') {
        options = Object.assign(ajaxPlugin.initOptions, options)
      }
      let a = ajax(options)
      a.ajax()
    } else {
      console.log('options传参有误')
    }
  }
}
export default ajaxPlugin
