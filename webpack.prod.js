const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Webpack = require('webpack')

module.exports = merge(common, {
	mode: 'production',
	module: {
		rules: [
			{ //在生产环境下配置CSS提取
				test: /\.css$/,
				use: [
					process.env.NODE_ENV === 'production'
						? 'vue-style-loader'
						: MiniCssExtractPlugin.loader, 'css-loader'
				]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin({ //默认清除的文件夹是dist文件夹
			verbose: true,
			dry: false
		}),
		new Webpack.optimize.MinChunkSizePlugin({ //限制最小chunk体积
			minChunkSize: 10000
		}),
		new MiniCssExtractPlugin({
			filename: 'style.css'
		})
	],
})
