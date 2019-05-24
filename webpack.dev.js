const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
const Webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = merge(common, {
	mode: 'development',
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		hot: true,
		port: 9000,
		open: true,
		quiet: true,
		overlay: { //编译错误直接展示在页面中
			errors: true
		},
		// openPage: 'mypage/', 用于打开对应的路由公共路径
		allowedHosts: [ //白名单
			'//r.51gjj.com',
			"b.jianbing.com"
		],
		proxy: { //代理
			'/invest2': { //本地开发代理，将对应的本地开发代理到远端服务器，运用的技术是反向代理，解决本地开发跨域问题
				target: 'https://b.jianbing.com',
				changeOrigin: true
			},
			'/v1': {
				target: 'https://xiaoce-discount-storage-api-ms.juejin.im',
				changeOrigin: true
			}
		}
	},
	plugins: [ //热更新插件
		new Webpack.NamedModulesPlugin(), //下面两个为模块热替换插件
		new Webpack.HotModuleReplacementPlugin(),
		new FriendlyErrorsPlugin() //用于清除编译输出的无用信息
	]
})
