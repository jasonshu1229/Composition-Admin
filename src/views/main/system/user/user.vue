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
			pageName="users"
			:modalConfig="modalConfigRef"
			:defaultInfo="defaultInfo"
		/>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

import PageSearch from '@/components/page-search';
import PageContent from '@/components/page-content';
import PageModal from '@/components/page-modal';

import ShForm from '@/base-ui/form';

import { searchFormConfig } from './config/search.config';
import { contentTableConfig } from './config/content.config';
import { modalConfig } from './config/modal.config';

import { usePageSearch } from '@/hooks/usePageSearch';
import { usePageModal } from '@/hooks/usePageModal';
import { useStore } from '@/store';

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

		// 2. 动态添加部门和角色列表
		// 注意：使用 computed 监听 vuex 中数据发生的改变，当数据发生改变，重新执行 computed 中的 getter 函数
		const store = useStore();
		const modalConfigRef = computed(() => {
			const departmentItem = modalConfig.formItems.find(
				(item) => item.field === 'departmentId'
			);
			departmentItem!.options = store.state.entireDepartment.map((item) => {
				return { title: item.name, value: item.id };
			});
			const roleItem = modalConfig.formItems.find(
				(item) => item.field === 'roleId'
			);
			roleItem!.options = store.state.entireRole.map((item) => {
				return { title: item.name, value: item.id };
			});
			return modalConfig;
		});

		// 3. 调用hook获取公共变量和函数
		const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
			usePageModal(newCallback, editCallback);

		return {
			searchFormConfig,
			contentTableConfig,
			modalConfig,
			pageContentRef,
			pageModalRef,
			defaultInfo,
			modalConfigRef,
			handleResetClick,
			handleQueryClick,
			handleNewData,
			handleEditData
		};
	}
});
</script>

<style scoped></style>
