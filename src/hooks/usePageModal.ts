import { ref } from 'vue';
import PageModal from 'components/page-modal';

// 定义回调函数类型
type CallbackFn = (item?: any) => void;

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
		// 回显编辑数据
		defaultInfo.value = { ...item };
		if (pageModalRef.value) {
			pageModalRef.value.centerDialogVisible = true;
		}
		console.log('编辑按钮', { ...item });
		editCb && editCb(item);
	};

	return [pageModalRef, defaultInfo, handleNewData, handleEditData];
}
