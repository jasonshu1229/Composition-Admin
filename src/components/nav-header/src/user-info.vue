<template>
	<div class="user-info">
		<el-dropdown>
			<span class="el-dropdown-link">
				<el-avatar
					size="default"
					src="https://s2.loli.net/2022/08/18/zHrOPClInoaWFgJ.jpg"
				/>
				<span class="name">{{ name }}</span>
			</span>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item>退出登录</el-dropdown-item>
					<el-dropdown-item divided>个人信息</el-dropdown-item>
					<el-dropdown-item>修改密码</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
	name: 'user-info',
	setup() {
		const store = useStore();
		const name = store.state.login.userInfo.name;

		return {
			name
		};
	}
});
</script>

<style scoped lang="less">
.user-info {
	margin-left: 12px;
}

.el-dropdown-link {
	cursor: pointer;
	color: #333333;
	display: flex;
	align-items: center;

	.name {
		margin-left: 8px;
	}
}
</style>
