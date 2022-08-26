<template>
	<div class="page-modal">
		<el-dialog
			v-model="centerDialogVisible"
			title="新建用户"
			width="30%"
			center
		>
			<sh-form v-bind="modalConfig" :modelValue="modelValue"></sh-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="centerDialogVisible = false">取消</el-button>
					<el-button type="primary" @click="centerDialogVisible = false"
						>确认</el-button
					>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import ShForm from '@/bast-ui/form';

export default defineComponent({
	name: 'page-modal',
	props: {
		modalConfig: {
			type: Object,
			required: true
		}
	},
	components: {
		ShForm
	},
	setup() {
		const centerDialogVisible = ref(false);
		const modelValue = ref({});

		return {
			centerDialogVisible,
			modelValue
		};
	}
});
</script>

<style scoped lang="less"></style>
