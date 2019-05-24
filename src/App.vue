<template lang="html">
	<div class="">
		<p class="hello">{{str}}</p>
	</div>
</template>

<script>
export default {
	data: () => ({
		str: 'hello vue model'
	}),
	methods: {
		getData() {
			return new Promise((resolve, reject) => {
				if(true) {
					resolve(1)
				}else {
					reject(0)
				}
			})
		}
	},
	created() {
		this.getData().then((data) => {
			console.log(data);
		})
	},
	mounted() {

	}
}
</script>

<style lang="less" scoped>
@import url('./common.css');
.hello {
	font-size: 16px;
	color: red;
	height: 18px;
	line-height: 18px;
	background: blue;
}
</style>
