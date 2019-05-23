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

	},
	created() {

	},
	mounted() {

	}
}
</script>

<style lang="less" scoped>
.hello {
	font-size: 16px;
	color: red;
	height: 18px;
	line-height: 18px;
}
</style>
