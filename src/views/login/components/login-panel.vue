<template>
	<div class="login-panel">
		<h1 class="title">后台管理系统</h1>
		<el-tabs type="border-card" class="demo-tabs" stretch>
			<el-tab-pane>
				<template #label>
					<span class="custom-tabs-label">
						<el-icon><calendar /></el-icon>
						<span>账号登录</span>
					</span>
				</template>
				<login-account />
			</el-tab-pane>
			<el-tab-pane label="Config">
				<template #label>
					<span class="custom-tabs-label">
						<el-icon><Iphone /></el-icon>
						<span>手机登录</span>
					</span>
				</template>
				手机登录
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Calendar, Iphone } from '@element-plus/icons-vue';
import LoginAccount from '@/views/login/components/login-account.vue';

export default defineComponent({
	name: 'login-panel',
	components: {
		Calendar,
		Iphone,
		LoginAccount
	},
	setup() {
		return {
			Calendar,
			Iphone
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
}
</style>
