<template lang="html">
	<div class="">
		<p class="hello">{{str}}</p>
		<img src="./assets/dog.jpg" alt="">
	</div>
</template>

<script>
import addFn from './ts/common.ts'

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
		},
		fetchData() {
			this.$ajax({
				url: '/invest2/forum/article/getArticleList/1',
				type: "GET",
				success: (r) => {
					console.log(r.resData);
				}
			})
		},
		getDatas() {
			this.$ajax({
				url: '/v1/getNewUserDiscountTicketDetail?uid=&client_id=&token=&src=web',
				type: "GET",
				success: (r) => {
					console.log(r.m);
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
		this.fetchData()
		setTimeout(() => {
			this.getDatas()
		}, 500)
		console.log(addFn(1, 2), 'oo');
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
