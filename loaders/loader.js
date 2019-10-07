const loaderUtils = require('loader-utils')

const schema = {
	type: 'object',
	properties: {
		test: {
			type: 'string'
		}
	}
}
console.log('my loader')
const fn = function(source) {
	console.log(source);
	return `export default ${JSON.stringify(source)}`
}
module.exports = fn
