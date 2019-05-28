# 本项目是一个用webpack自主搭建的vue开发项目，主要构建步骤：
	1. 新建一个项目，初始化项目`npm init -y`，会生成一个package.json文件，同时在开发模式下安装`webpack webpack-cli`
	2. 添加对应的dev配置文件和pro配置文件，添加`entry,output,plugins,loaders`等相关配置项
	3. 增加热更新插件
	4. 增加自动清除`dist`文件夹插件
	5. 增加`babel`对于`ES6`语法的支持
	6. 增加`ts-loader`对于`typescript`的支持
	7. 按照官网`vue-loader`的基础配置增加对`vue`文件的编译打包支持
	8. 优化打包方式，分离css和js
	9. 增加TS的配置文件，增加打包分析
	10. 增加开发环境下的`proxy`接口代理服务配置
	12. 增加打包性能分析工具
	13. 增加`postcss-loader`用于补全浏览器前缀
	14. 测试`happypack`插件发现其降低了打包性能
	15. 修改`publicPath`以及`img`的输出路径，确保生产环境下静态资源的正确地址

# 项目用来构建自己的组件库

```bash
npm run build  //正常打包
set pro=analyze&npm run build //启用打包分析
npm run start/dev/serve //项目运行
npm run lint //Eslint检测
```
