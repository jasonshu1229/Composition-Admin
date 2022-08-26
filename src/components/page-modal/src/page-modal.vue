<template>
	<div class="page-modal">
		<el-dialog
			v-model="centerDialogVisible"
			title="新建用户"
			width="30%"
			center
			destroy-on-close
		>
			<sh-form v-bind="modalConfig" v-model="formData"></sh-form>
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
import { defineComponent, ref, watch } from 'vue';

import ShForm from '@/bast-ui/form';

export default defineComponent({
	name: 'page-modal',
	props: {
		modalConfig: {
			type: Object,
			required: true
		},
		defaultInfo: {
			type: Object,
			default: () => ({})
		}
	},
	components: {
		ShForm
	},
	setup(props) {
		const centerDialogVisible = ref(false);
		const formData = ref<any>({});

		watch(
			() => props.defaultInfo,
			(newValue) => {
				for (const item of props.modalConfig.formItems) {
					formData.value[`${item.field}`] = newValue[`${item.field}`];
				}
			}
		);

		return {
			centerDialogVisible,
			formData
		};
	}
});
</script>

<style scoped lang="less"></style>
