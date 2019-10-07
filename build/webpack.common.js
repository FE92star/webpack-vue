const path = require('path')
const os = require('os') //node内置的OS模块
// const HappyPack = require('happypack') //多进程并发解析代码,提高执行打包效率，实测此插件反而降低了打包效率，应该事loader的兼容性问题导致的
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devMode = process.env.NODE_ENV !== 'production'
// 根据系统的内核数量 指定线程池个数 也可以其他数量
// const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length})

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
		require('autoprefixer'),
		// new HappyPack({
		// 	id: 'babel',
		// 	loaders: ['babel-loader?cacheDirectory'],
		// 	threadPool: happyThreadPool,
		// 	verbose: true
		// })
	],
	resolve: {
		extensions: ['.js', '.vue', '.json', '.ts'], //用于在引入这几种类型的文件时不需要加文件后缀名，webpack会自动解析
		alias: { //文件或者路径引用的别名
			vue$: 'vue/dist/vue.esm.js',
			'@': resolve('src')
		},
		modules: [resolve('src'), 'node_modules'] //配置快捷查找模块
	},
	externals: { //主要是用于vue或者其他库在以script标签形式引入的时候，不需要再把对应的库打包一次，同时支持各种模块化引入方式
		vue: 'vue'
	},
	module: {
		noParse: (content) => /jquery|lodash/.test(content), //对不包含模块引入的库忽略对其进行loader的递归解析
		rules: [
			// eslint-loader
			{
				test: /\.(js|vue)$/,
				loader: 'eslint-loader',
				enforce: 'pre',
				include: [resolve('src'), resolve('test')],
				options: {
					formatter: require('eslint-friendly-formatter'),
					quiet: true
				}
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{ //开发环境下配置CSS的loader
				test: /\.css$/,
				use: [
					devMode
					? 'vue-style-loader'
					: MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader' //增加postcss-loader用于增加css浏览器前缀，对应的插件加载配置在package.json文件中，同时需要增加browserLists即可补全-moz-
				]
			},
			{
				test: /\.less$/,
				loader: 'style-loader!css-loader!less-loader!postcss-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader?cacheDirectory', //缓存loader执行结果 提升打包速度(打包时间减少400ms左右)
				// loader: 'happypack/loader?id=babel',
				include: [resolve('src'), resolve('test')], //必须匹配对应选项
				exclude: /node_modules/
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
					outputPath: 'img' //输出目录，对于生产环境下的静态资源不能加"/img"，否则资源地址不对
				}
			},
			{ //字体loader
				test: /\.(woff2?|eot|ttf|otf)(\?.*)$/,
				loader: 'file-loader',
				options: {
					limit: 1024 * 100,
					name: '[name].[hash:8].[ext]',
					outputPath: 'font'
				}
			},
			// { //自定义loaders
			// 	test: /\.js$/,
			// 	loader: resolve('/loaders/loader.js')
			// }
		]
	}
}
