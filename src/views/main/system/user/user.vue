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
		<page-modal
			ref="pageModalRef"
			:modalConfig="modalConfig"
			:defaultInfo="defaultInfo"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import PageSearch from '@/components/page-search';
import PageContent from '@/components/page-content';
import PageModal from '@/components/page-modal';

import ShForm from '@/bast-ui/form';

import { searchFormConfig } from './config/search.config';
import { contentTableConfig } from './config/content.config';
import { modalConfig } from './config/modal.config';

import { usePageSearch } from '@/hooks/usePageSearch';
import { usePageModal } from '@/hooks/usePageModal';

export default defineComponent({
	name: 'user',
	components: { PageModal, PageSearch, PageContent, ShForm },
	setup() {
		const [pageContentRef, handleResetClick, handleQueryClick] =
			usePageSearch();

		const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
			usePageModal();

		return {
			searchFormConfig,
			contentTableConfig,
			modalConfig,
			pageContentRef,
			pageModalRef,
			defaultInfo,
			handleResetClick,
			handleQueryClick,
			handleNewData,
			handleEditData
		};
	}
});
</script>

<style scoped></style>
