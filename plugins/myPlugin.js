function MyPlugin() {

}
MyPlugin.prototype.apply = function(compiler) {
	// hooks的新写法
	compiler.hooks.done.tap('BuildStatsPlugin', (stats) => {
	  console.log('my plugin');
	})
}
module.exports = MyPlugin
