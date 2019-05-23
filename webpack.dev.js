const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Webpack = require('webpack')

module.exports = merge(common, {
	devServer: {
		contentBase: './dist',
		hot: true
	},
	plugins: [
		new Webpack.NamedModulesPlugin(), //下面两个为模块热替换插件
		new Webpack.HotModuleReplacementPlugin(),
	]
})
