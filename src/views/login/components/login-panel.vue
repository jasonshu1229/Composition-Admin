<template>
	<div class="login-panel">
		<h1 class="title">后台管理系统</h1>
		<el-tabs type="border-card" class="demo-tabs" stretch>
			<el-tab-pane>
				<template #label>
					<span class="custom-tabs-label">
						<el-icon><User /></el-icon>
						<span>账号登录</span>
					</span>
				</template>
				<login-account ref="accountRef" />
			</el-tab-pane>
			<el-tab-pane label="Config">
				<template #label>
					<span class="custom-tabs-label">
						<el-icon><Iphone /></el-icon>
						<span>手机号登录</span>
					</span>
				</template>
				<login-phone />
			</el-tab-pane>
		</el-tabs>

		<div class="account-control">
			<el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
			<el-link type="primary">忘记密码</el-link>
		</div>

		<el-button type="primary" class="login-btn" @click="handleLoginClick">
			立即登录
		</el-button>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { User, Iphone } from '@element-plus/icons-vue';
import LoginAccount from '@/views/login/components/login-account.vue';
import LoginPhone from '@/views/login/components/login-phone.vue';

export default defineComponent({
	name: 'login-panel',
	components: {
		User,
		Iphone,
		LoginAccount,
		LoginPhone
	},
	setup() {
		const isKeepPassword = ref(true);
		// type LoginAccount 组件对象类型 => InstanceType<typeof LoginAccount> 组件对象实例类型
		const accountRef = ref<InstanceType<typeof LoginAccount>>();

		const handleLoginClick = () => {
			console.log('立即登录');
			accountRef.value?.loginAction(isKeepPassword.value);
		};

		return {
			User,
			Iphone,
			isKeepPassword,
			handleLoginClick,
			accountRef
		};
	}
});
</script>

<style scoped lang="less">
.demo-tabs > .el-tabs__content {
	padding: 32px;
	color: #6b778c;
	font-size: 32px;
	font-weight: 600;
}

.demo-tabs .custom-tabs-label .el-icon {
	vertical-align: middle;
}

.demo-tabs .custom-tabs-label span {
	vertical-align: middle;
	margin-left: 4px;
}

.login-panel {
	width: 320px;

	.title {
		text-align: center;
	}

	.account-control {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;

		.el-link {
			margin-right: 8px;
		}

		.el-link .el-icon--right.el-icon {
			vertical-align: text-bottom;
		}
	}

	.login-btn {
		width: 100%;
		margin-top: 10px;
	}
}
</style>
