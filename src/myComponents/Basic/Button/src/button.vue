<template lang="html">
	<div class="">
		<button
			type="button"
			name="button"
			:class="buttonClass"
			>
			<img :src="`../icons/${iconType}.png`" alt="" v-if="circle">
			<slot></slot>
		</button>
	</div>
</template>

<script>
export default {
	name: 'bao-button',
	data: () => ({
		typeLists: ['primary', 'success', 'info', 'warning', 'danger'],
		bgLists: ['#409eff', '#67c23a', '#909399', '#e6a23c', '#f56c6c']
	}),
	props: {
		type: { // 按钮类型
			type: String,
			default: '' // ['primary', 'success', 'info', 'warning', 'danger']-五种类型
		},
		simple: { // 是否是朴素类按钮
			type: Boolean,
			default: false
		},
		round: { // 是否是圆角按钮
			type: Boolean,
			default: false
		},
		circle: { // 是否是圆形带有icon的按钮
			type: Boolean,
			default: false
		},
		iconType: { // icon类型
			type: String,
			default: 'edit'
		}
	},
	computed: {
		buttonClass() {
			if(this.simple) {
				return `bao_isSimple_${this.type}`
			}else if(this.round) {
				return [`bao_${this.type}`, `bao_isRound`]
			}else if(this.circle) {
				return [`bao_${this.type}`, `bao_isCircle`]
			}else {
				return `bao_${this.type}`
			}
		}
	},
	methods: {

	},
	created() {

	},
	mounted() {
		this.$nextTick(() => {
			let bgColor = {}
			this.typeLists.forEach((type, index) => {
				bgColor[type] = this.bgLists[index]
			})
			document.styleSheets[0].addRule(`.bao_isSimple_${this.type}:before`, `background: ${bgColor.type} !important`)
		})
	}
}
</script>

<style lang="less" scoped>
.buttonStyle(@color, @bgColor, @bdColor) {
	color: @color;
	background-color: @bgColor;
	border-color: @bdColor;
}

button {
	display: inline-block;
	margin: 0;
	outline: none;
	box-sizing: border-box;
	padding: 12px 20px;
	font-size: 14px;
	color: #606266;
	border-radius: 4px;
	line-height: 1;
	white-space: nowrap;
	background: #fff;
	text-align: center;
	/* 移除原生控件的默认展示样式 */
	-webkit-appearance: none;
	font-weight: 500;
	border: 1px solid #dcdfe6;
	&:active {
		opacity: .86;
	}
}
button[class^="bao_isSimple_"] {

}
.bao_primary {
	color: #fff;
	background-color: #409eff;
	border-color: #409eff;
}
.bao_success {
	color: #fff;
	background-color: #67c23a;
	border-color: #67c23a;
}
.bao_info {
	color: #fff;
	background-color: #909399;
	border-color: #909399;
}
.bao_warning {
	color: #fff;
	background-color: #e6a23c;
	border-color: #e6a23c;
}
.bao_danger {
	color: #fff;
	background-color: #f56c6c;
	border-color: #f56c6c;
}
.bao_isSimple_primary {
	color: #409eff;
	background-color: #ecf5ff;
	border-color: #b3d8ff;
	&:active {
		background: #409eff;
		color: #fff;
	}
}
.bao_isSimple_success {
	color: #67c23a;
	background-color: #f0f9eb;
	border-color: #c2e7b0;
	&:active {
		background: #67c23a;
		color: #fff;
	}
}
.bao_isSimple_info {
	color: #909399;
	background-color: #f4f4f5;
	border-color: #d3d4d6;
	&:active {
		background: #909399;
		color: #fff;
	}
}
.bao_isSimple_warning {
	color: #e6a23c;
	background-color: #fdf6ec;
	border-color: #f5dab1;
	&:active {
		background: #e6a23c;
		color: #fff;
	}
}
.bao_isSimple_danger {
	color: #f56c6c;
	background-color: #fef0f0;
	border-color: #fbc4c4;
	&:active {
		background: #f56c6c;
		color: #fff;
	}
}
.bao_isRound {
	border-radius: 20px;
	padding: 12px 23px;
}
.bao_isCircle {
	border-radius: 50%;
	padding: 12px;
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		width: 14px;
		display: block;
	}
}
</style>
