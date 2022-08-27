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

		// 1. 处理 pageModal相关的 hook 逻辑
		// 是否显示"密码选项"的input
		const newCallback = () => {
			const passwordItem = modalConfig.formItems.find(
				(item) => item.field === 'password'
			);
			passwordItem!.isHidden = false;
		};

		const editCallback = () => {
			const passwordItem = modalConfig.formItems.find(
				(item) => item.field === 'password'
			);
			passwordItem!.isHidden = true;
		};

		const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
			usePageModal(newCallback, editCallback);

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
