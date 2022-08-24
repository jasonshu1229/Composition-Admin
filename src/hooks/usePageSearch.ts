import { ref } from 'vue';
import PageContent from '@/components/page-content';

export function usePageSearch() {
	// type PageContent 组件对象类型 => InstanceType<typeof PageContent> 组件对象实例类型
	const pageContentRef = ref<InstanceType<typeof PageContent>>();

	const handleResetClick = () => {
		pageContentRef.value?.getPageData();
	};

	const handleQueryClick = (queryInfo: any) => {
		pageContentRef.value?.getPageData(queryInfo);
	};

	return [pageContentRef, handleResetClick, handleQueryClick];
}
