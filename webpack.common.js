const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devMode = process.env.NODE_ENV !== 'production'

function resolve(dir) {
	return path.join(__dirname, './', dir)
}

module.exports = {
	entry: [
		// "babel-polyfill",
		path.join(__dirname, './src/main.js')
	],
	plugins: [
		new HtmlWebpackPlugin({ //编译打包公用html模板
			template: './public/index.html',
			title: 'webpack-vue'
		}),
		new VueLoaderPlugin(), //需要使用这个插件用来解析vue文件
	],
	resolve: {
		extensions: ['.js', '.vue', '.json'], //用于在引入这几种类型的文件时不需要加文件后缀名，webpack会自动解析
		alias: { //文件或者路径引用的别名
			vue$: 'vue/dist/vue.esm.js',
			'@': resolve('src')
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{ //开发环境下配置CSS的loader
				test: /\.css$/,
				use: [
					devMode
					? 'vue-style-loader'
					: MiniCssExtractPlugin.loader, 'css-loader'
				]
			},
			{
				test: /\.less$/,
				loader: 'style-loader!css-loader!less-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [resolve('src'), resolve('test')] //必须匹配对应选项
			},
			{ //匹配TS文件类型
				test: /\.ts$/,
				loader: 'ts-loader',
				options: {
					appendTsSuffixTo: [/\.vue$/]
				}
			},
			{
				test: /\.(png|svg|jpg|gif)(\?.*)?$/,
				loader: 'file-loader',
				options: {
					limit: 1024 * 500
				}
			}
		]
	}
}
