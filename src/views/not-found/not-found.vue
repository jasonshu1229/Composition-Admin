<template>
	<div class="not-container">
		<img src="@/assets/img/404.png" class="not-img" alt="404" />
		<div class="not-detail">
			<h2>404</h2>
			<h4>抱歉，您访问的页面不存在~🤷‍♂️🤷‍♀️</h4>
			<el-button type="primary" @click="handleGoHome">返回首页</el-button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router from '@/router';

export default defineComponent({
	name: 'not-found',
	setup() {
		const handleGoHome = () => {
			router.push('/main');
		};

		return {
			handleGoHome
		};
	}
});
</script>

<style scoped lang="less">
.not-container {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;

	.not-img {
		margin-right: 120px;
	}

	.not-detail {
		display: flex;
		flex-direction: column;

		h2,
		h4 {
			padding: 0;
			margin: 0;
		}

		h2 {
			font-size: 60px;
			color: #434e59;
		}

		h4 {
			margin: 30px 0 20px;
			font-size: 19px;
			font-weight: normal;
			color: #848587;
		}

		.el-button {
			width: 100px;
		}
	}
}
</style>
