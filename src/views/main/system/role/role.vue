<template>
	<div class="role">
		<page-search :searchFormConfig="searchFormConfig" />
		<page-content
			:contentTableConfig="contentTableConfig"
			pageName="role"
			@newBtnClick="handleNewData"
			@editClick="handleEditData"
		/>
		<page-modal
			ref="pageModalRef"
			:defaultInfo="defaultInfo"
			:otherInfo="otherInfo"
			:modalConfig="modalConfig"
			pageName="role"
		>
			<div class="menu-tree">
				<el-tree
					:data="menus"
					show-checkbox
					node-key="id"
					:props="{ children: 'children', label: 'name' }"
					@check="handleCheckChange"
				/>
			</div>
		</page-modal>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from '@/store';

import PageSearch from '@/components/page-search';
import PageContent from '@/components/page-content';
import PageModal from '@/components/page-modal';

import { searchFormConfig } from './config/search.config';
import { contentTableConfig } from './config/content.config';
import { modalConfig } from './config/modal.config';

import { usePageModal } from '@/hooks/usePageModal';

export default defineComponent({
	name: 'role',
	components: { PageSearch, PageContent, PageModal },
	setup() {
		const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
			usePageModal();

		const store = useStore();
		// 使用计算属性 保证数据是响应式的，防止因为后获取到出现问题
		const menus = computed(() => store.state.entireMenu);

		// otherInfo用来传递 添加角色菜单下自定义item选项
		const otherInfo = ref({});
		const handleCheckChange = (data1: any, data2: any) => {
			const checkedKeys = data2.checkedKeys;
			const halfCheckedKeys = data2.halfCheckedKeys;
			const menuList = [...checkedKeys, ...halfCheckedKeys];
			otherInfo.value = { menuList };
		};

		return {
			searchFormConfig,
			contentTableConfig,
			modalConfig,
			pageModalRef,
			defaultInfo,
			handleNewData,
			handleEditData,
			menus,
			handleCheckChange,
			otherInfo
		};
	}
});
</script>

<style scoped lang="less">
.menu-tree {
	margin-left: 25px;
}
</style>
