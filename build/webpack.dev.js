const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
const Webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = merge(common, {
	mode: 'development',
	devtool: 'cheap-module-eval-source-map', //开发环境推荐用这种sourceMap
	devServer: {
		contentBase: path.join(__dirname, '../dist'),
		hot: true,
		host: '127.0.0.1',
		port: 9000,
		open: true,
		quiet: true, //用于清除编译输出的无用信息
		overlay: { //编译错误直接展示在页面中
			errors: true
		},
		clientLogLevel: "none", //关闭提示
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
		new FriendlyErrorsPlugin() //用于配合quiet模式输出绿色编译结果文案
	]
})
