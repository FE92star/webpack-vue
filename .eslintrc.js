module.exports = {
  root: true,
		parserOptions: {
			spurceType: 'module',
			parser: 'babel-eslint'
		},
  env: {
    node: true
  },
  extends: [
			'standard',
			'plugin:vue/essential'
		],
  'rules': {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
				'indent': 'off', //缩进
				'no-tabs': 'off', //禁用tab
				"keyword-spacing": 'off', //关键字前后空格校验
				"quotes": 'off', //字符串单双引号的校验
				"prefer-promise-reject-errors": 'off', //promise中reject参数必须是Error对象的校验
				"no-constant-condition": 'off', //if判断条件
				'no-plusplus': 'off', //禁用一元操作符++和--
    'consistent-return': 'off', //禁止函数return为空
    'func-names': 'off', //函数名称
    'prefer-destructuring': 'off', //强制使用array和object的解构赋值
    'no-restricted-syntax': 0, //禁用特定语法
    'comma-dangle': 0, //拖尾逗号问题
    'linebreak-style': ['error', 'windows'], //使用回车换行
    'semi': ['error', 'never'], //取消使用句尾分号
    'space-before-function-paren': 0, //函数名和圆括号之间的空格
    'object-curly-newline': 0, //花括号的换行符
    'max-len': 0,  //一行的代码长度限制
    'prefer-spread': 0, //扩展运算符的强制使用
  }
}
