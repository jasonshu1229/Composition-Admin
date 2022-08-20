<template>
	<div class="page-search">
		<sh-form v-bind="searchFormConfig" v-model="formData">
			<template #header>
				<h2 class="header">高级检索</h2>
			</template>
			<template #footer>
				<div class="handle-formBtn">
					<el-button>
						<el-icon>
							<Refresh />
						</el-icon>
						重置
					</el-button>
					<el-button type="primary">
						<el-icon>
							<Search />
						</el-icon>
						搜索
					</el-button>
				</div>
			</template>
		</sh-form>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ShForm from '@/bast-ui/form';

export default defineComponent({
	name: 'page-search',
	props: {
		searchFormConfig: {
			type: Object,
			required: true
		}
	},
	components: {
		ShForm
	},
	setup() {
		const formData = ref({
			id: '',
			name: '',
			password: '',
			singer: '',
			createTime: ''
		});
		return {
			formData
		};
	}
});
</script>

<style scoped lang="less">
.header {
	color: red;
}

.handle-formBtn {
	text-align: right;
	padding: 0 50px 20px 0;
}
</style>
