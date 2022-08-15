<template>
	<div class="login-phone">
		<el-form
			label-width="70px"
			:rules="rules"
			:model="phone"
			ref="verifyFormRef"
		>
			<el-form-item label="手机号" prop="num">
				<el-input v-model="phone.num" placeholder="请输入11位手机号~" />
			</el-form-item>
			<el-form-item label="验证码" prop="verifyCode">
				<div class="get-verifyCode">
					<el-input v-model="phone.verifyCode" placeholder="6位随机英文字母~" />
					<el-button
						type="primary"
						class="get-verify-code"
						@click="handleRandomVerifyCode"
						:disabled="isDisabled"
						>{{ verifyCodeBtnText }}
					</el-button>
				</div>
			</el-form-item>
		</el-form>
	</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { useStore } from 'vuex';
import { rules } from '@/views/login/config/phone-config';
import { getRandomNum } from '@/utils/util';
import { ElForm } from 'element-plus';

export default defineComponent({
	name: 'login-phone',
	setup() {
		const phone = reactive({
			num: '',
			verifyCode: ''
		});
		const verifyCodeBtnText = ref('获取验证码');
		const isDisabled = ref(false);
		const verifyFormRef = ref<InstanceType<typeof ElForm>>();
		const store = useStore();

		const verifyCodeLogin = () => {
			verifyFormRef.value?.validate((valid) => {
				console.log(valid);
				// 满足手机号验证码登录校验规则，触发回调
				if (valid) {
					store.dispatch('login/phoneLoginAction', { ...phone });
				}
			});
		};

		const handleRandomVerifyCode = () => {
			let count = 60;
			isDisabled.value = true;
			let c = setInterval(() => {
				if (count > 0) {
					verifyCodeBtnText.value = `验证码${count--}s`;
				} else {
					clearInterval(c);
					verifyCodeBtnText.value = `验证码`;
					isDisabled.value = false;
				}
			}, 1000);
			phone.verifyCode = getRandomNum(6);
		};

		return {
			phone,
			rules,
			verifyCodeBtnText,
			isDisabled,
			verifyFormRef,
			verifyCodeLogin,
			handleRandomVerifyCode
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
