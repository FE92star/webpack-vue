<template lang="html">
	<div class="app">
		<p class="hello">{{str}}</p>
		<!-- <img src="./assets/dog.jpg" alt=""/> -->
	</div>
</template>

<script>
import addFn from '@/ts/common.ts'

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
					reject()
				}
			})
		},
		fetchData() {
			this.$ajax({
				url: '/invest2/forum/article/getArticleList/1',
				type: "GET",
				success: (r) => {
					console.log(r.resData)
				}
			})
		},
		getDatas() {
			this.$ajax({
				url: '/v1/getNewUserDiscountTicketDetail?uid=&client_id=&token=&src=web',
				type: "GET",
				success: (r) => {
					console.log(r.m)
				}
			})
		},
		// 两数之和算法
		addTwoSum(nums, target) { // nums数字数组，target为两个目标数字之和
			let obj = {}
			for(let i = 0, len = nums.length; i < len; i++) {
				let data = nums[i]
				const otherNum = target - data
				if(otherNum in obj) {
					return [obj[otherNum], i]
				}
				obj[data] = i
			}
		}
	},
	created() {
		this.getData().then((data) => {
			console.log(data)
		})
	},
	mounted() {
		this.fetchData()
		setTimeout(() => {
			this.getDatas()
		}, 500)
		console.log(addFn(1, 2), 'oo')
	}
}
</script>

<style lang="less" scoped>
* {
	margin: 0;
	padding: 0;
}
.app {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: auto;
		overflow-x: hidden;
		overflow-y: scroll;
		-webkit-overflow-scrolling: touch;
}
@import url('./common.css');
.hello {
		font-size: 16px;
		color: red;
		height: 18px;
		line-height: 18px;
		background: blue;
		display: flex;
		transform: translateX(-50%);
		position: absolute;
		left: 50%;
		top: 0;
}
img {
	width: 100%;
}
</style>
