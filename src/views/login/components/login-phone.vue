<template>
	<div>
		<el-form label-width="60px">
			<el-form-item label="手机号" prop="num">
				<el-input v-model="phone.num" />
			</el-form-item>
			<el-form-item label="验证码" prop="verifyCode">
				<div class="get-verifyCode">
					<el-input v-model="phone.verifyCode" />
					<el-button type="primary" class="get-verify-code"
						>获取验证码</el-button
					>
				</div>
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
	name: 'login-phone',
	setup() {
		const phone = reactive({
			num: '',
			verifyCode: ''
		});

		return {
			phone
		};
	}
});
</script>

<style scoped lang="less">
.get-verifyCode {
	display: flex;

	.get-verify-code {
		margin-left: 8px;
	}
}
</style>
