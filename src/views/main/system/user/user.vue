<template>
	<div class="user">
		<page-search
			:searchFormConfig="searchFormConfig"
			@resetBtnClick="handleResetClick"
			@queryBtnClick="handleQueryClick"
		/>
		<page-content
			ref="pageContentRef"
			:contentTableConfig="contentTableConfig"
			pageName="users"
			@newBtnClick="handleNewData"
			@editBtnClick="handleEditData"
		/>
		<page-modal ref="pageModalRef" :modalConfig="modalConfig" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import PageSearch from '@/components/page-search';
import PageContent from '@/components/page-content';
import PageModal from '@/components/page-modal';

import ShForm from '@/bast-ui/form';

import { searchFormConfig } from './config/search.config';
import { contentTableConfig } from './config/content.config';
import { modalConfig } from './config/modal.config';

import { usePageSearch } from '@/hooks/usePageSearch';

export default defineComponent({
	name: 'user',
	components: { PageModal, PageSearch, PageContent, ShForm },
	setup() {
		const [pageContentRef, handleResetClick, handleQueryClick] =
			usePageSearch();

		const pageModalRef = ref<InstanceType<typeof PageModal>>();

		const handleNewData = () => {
			if (pageModalRef.value) {
				pageModalRef.value.centerDialogVisible = true;
			}
		};

		const handleEditData = (item: any) => {
			if (pageModalRef.value) {
				pageModalRef.value.centerDialogVisible = true;
			}
		};

		return {
			searchFormConfig,
			contentTableConfig,
			modalConfig,
			pageContentRef,
			pageModalRef,
			handleResetClick,
			handleQueryClick,
			handleNewData,
			handleEditData
		};
	}
});
</script>

<style scoped></style>
