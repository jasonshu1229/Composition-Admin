import { ref } from 'vue';
import PageModal from 'components/page-modal';

/**
 * @description 显示提示框的一些操作
 */
export function usePageModal() {
	const pageModalRef = ref<InstanceType<typeof PageModal>>();
	const defaultInfo = ref({});

	const handleNewData = () => {
		defaultInfo.value = {};
		if (pageModalRef.value) {
			pageModalRef.value.centerDialogVisible = true;
		}
	};

	const handleEditData = (item: any) => {
		// 回显数据
		defaultInfo.value = { ...item };
		if (pageModalRef.value) {
			pageModalRef.value.centerDialogVisible = true;
		}
	};

	return [pageModalRef, defaultInfo, handleNewData, handleEditData];
}
