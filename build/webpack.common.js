const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devMode = process.env.NODE_ENV !== 'production'

function resolve(dir) {
	return path.join(__dirname, '../', dir)
}

module.exports = {
	entry: [
		path.join(__dirname, '../src/main.js')
	],
	plugins: [
		new HtmlWebpackPlugin({ //编译打包公用html模板
			// template: '../webpack-vue/public/index.html',
			template: resolve('./public/index.html'),
			inject: 'body',
			hash: true,
			minify: { //html压缩处理
				collapseWhitespace: true,
		  removeComments: true,
		  removeRedundantAttributes: true,
		  removeScriptTypeAttributes: true,
		  removeStyleLinkTypeAttributes: true,
		  useShortDoctype: true
			}
		}),
		new VueLoaderPlugin(), //需要使用这个插件用来解析vue文件
	],
	resolve: {
		extensions: ['.js', '.vue', '.json', '.ts'], //用于在引入这几种类型的文件时不需要加文件后缀名，webpack会自动解析
		alias: { //文件或者路径引用的别名
			vue$: 'vue/dist/vue.esm.js',
			'@': resolve('src')
		},
		modules: [resolve('src'), 'node_modules'] //配置快捷查找模块
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
				loader: 'babel-loader?cacheDirectory', //缓存loader执行结果 提升打包速度(打包时间减少400ms左右)
				include: [resolve('src'), resolve('test')] //必须匹配对应选项
			},
			{ //匹配TS文件类型
				test: /\.tsx?$/,
				loader: 'ts-loader',
				options: {
					appendTsSuffixTo: [/\.vue$/]
				}
			},
			{ //图片loader
				test: /\.(png|svg|jpg|gif)(\?.*)?$/,
				loader: 'file-loader',
				options: {
					limit: 1024 * 500, //图片最大体积不超过500kb
					name: '[name].[hash:8].[ext]', //图片名称
					outputPath: '/img' //输出目录
				}
			},
			{ //字体loader
				test: /\.(woff2?|eot|ttf|otf)(\?.*)$/,
				loader: 'file-loader',
				options: {
					limit: 1024 * 100,
					name: '[name].[hash:8].[ext]',
					outputPath: '/font'
				}
			}
		]
	}
}
