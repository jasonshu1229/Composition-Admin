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
			<slot></slot>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="centerDialogVisible = false">取消</el-button>
					<el-button type="primary" @click="handleConfirmClick">确认</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

import ShForm from '@/base-ui/form';
import { useStore } from '@/store';

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
		},
		otherInfo: {
			type: Object,
			default: () => ({})
		},
		pageName: {
			type: String,
			required: true
		}
	},
	components: {
		ShForm
	},
	setup(props) {
		const centerDialogVisible = ref(false);
		const formData = ref<any>({});

		console.log('otherInfo', props.otherInfo);

		watch(
			() => props.defaultInfo,
			(newValue) => {
				for (const item of props.modalConfig.formItems) {
					formData.value[`${item.field}`] = newValue[`${item.field}`];
				}
			}
		);

		// 点击确定按钮的逻辑
		const store = useStore();
		const handleConfirmClick = () => {
			centerDialogVisible.value = false;
			if (Object.keys(props.defaultInfo).length) {
				// 编辑
				store.dispatch('system/editPageDataAction', {
					pageName: props.pageName,
					editData: { ...formData.value, ...props.otherInfo },
					id: props.defaultInfo.id
				});
			} else {
				// 新建
				store.dispatch('system/createPageDataAction', {
					pageName: props.pageName,
					newData: { ...formData.value, ...props.otherInfo }
				});
			}
		};

		return {
			centerDialogVisible,
			formData,
			handleConfirmClick
		};
	}
});
</script>

<style scoped lang="less"></style>
