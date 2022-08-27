import { ref } from 'vue';
import PageModal from 'components/page-modal';

// 定义回调函数类型
type CallbackFn = () => void;

/**
 * @description 显示提示框的一些操作
 */
export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
	const pageModalRef = ref<InstanceType<typeof PageModal>>();
	const defaultInfo = ref({});

	const handleNewData = () => {
		defaultInfo.value = {};
		if (pageModalRef.value) {
			pageModalRef.value.centerDialogVisible = true;
		}
		newCb && newCb();
	};

	const handleEditData = (item: any) => {
		// 回显数据
		defaultInfo.value = { ...item };
		if (pageModalRef.value) {
			pageModalRef.value.centerDialogVisible = true;
		}
		editCb && editCb();
	};

	return [pageModalRef, defaultInfo, handleNewData, handleEditData];
}
