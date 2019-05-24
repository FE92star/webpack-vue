const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
// CSS分离和压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const Webpack = require('webpack')

// 基本参数
const proEnv = process.env.NODE_ENV !== 'production'

function resolve(dir) {
	return path.join(__dirname, './', dir)
}

module.exports = merge(common, {
	mode: 'production',
	optimization: { //webpack优化
  minimizer: [
			new OptimizeCSSAssetsPlugin({}), //CSS压缩
			new TerserPlugin({ //JS压缩
				cache: true,
				parallel: true,
				sourceMap: true,
				chunkFilter: (chunk) => { //用于配置对chunk类型JS的压缩
					if(chunk.name === 'vendor') {
						return false
					}
					return true
				}
			})
		]
 },
	output: {
		filename: 'js/[name].[chunkhash:8].js', //JS的输出
		chunkFilename: 'js/[name].[chunkhash:8].js',
		path: resolve('dist'),
		publicPath:
			process.env.NODE_ENV === 'production' ? `https://r.51gjj.com/webpublic/myvue/` : '' //生产环境公共路径为CDN基础目录，开发环境为根目录
	},
	// module: {
	// 	rules: [
	// 		{
	// 			test: /\.css$/,
	// 			use: [ //需要设置pubLiPath才可以正确提取CSS
	// 				{
	// 					loader: MiniCssExtractPlugin.loader,
	// 					options: {
	// 						publicPath: (resourcePath, context) => {
	// 							return path.relative(path.dirname(resourcePath), context) + '/'
	// 						}
	// 					}
	// 				},
	// 				'css-loader'
	// 			]
	// 		}
	// 	]
	// },
	plugins: [
		new CleanWebpackPlugin({ //默认清除的文件夹是dist文件夹
			verbose: true,
			dry: false
		}),
		new MiniCssExtractPlugin({ //只在生产环境下做CSS的提取可以保证开发环境下的热重载效果
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css'
		})
	],
})
