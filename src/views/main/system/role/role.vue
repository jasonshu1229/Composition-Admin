<template>
	<div class="role">
		<page-search :searchFormConfig="searchFormConfig" />
		<page-content
			:contentTableConfig="contentTableConfig"
			pageName="role"
			@newBtnClick="handleNewData"
			@editBtnClick="handleEditData"
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
					ref="elTreeRef"
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
import { defineComponent, ref, computed, nextTick } from 'vue';
import { useStore } from '@/store';

import PageSearch from '@/components/page-search';
import PageContent from '@/components/page-content';
import PageModal from '@/components/page-modal';

import { searchFormConfig } from './config/search.config';
import { contentTableConfig } from './config/content.config';
import { modalConfig } from './config/modal.config';

import { usePageModal } from '@/hooks/usePageModal';
import { menuMapLeafKeys } from '@/utils/map-menu';
import { ElTree } from 'element-plus';

export default defineComponent({
	name: 'role',
	components: { PageSearch, PageContent, PageModal },
	setup() {
		// 处理 pageModal 的 hook
		// 为了处理编辑菜单时的回显权限数据（回显树状数据，一般由"叶子"节点开始）
		// 需要需要先找到当时编辑选中的item的 叶子节点
		const elTreeRef = ref<InstanceType<typeof ElTree>>();
		const editCallback = (item: any) => {
			console.log('editCallback', item);
			const leafKeys = menuMapLeafKeys(item.menuList);
			nextTick(() => {
				console.log('elTreeRef', elTreeRef.value);
				elTreeRef.value?.setCheckedKeys(leafKeys, false);
			});
		};

		const [pageModalRef, defaultInfo, handleNewData, handleEditData] =
			usePageModal(undefined, editCallback);

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
			menus,
			pageModalRef,
			defaultInfo,
			handleNewData,
			handleEditData,
			handleCheckChange,
			otherInfo,
			elTreeRef
		};
	}
});
</script>

<style scoped lang="less">
.menu-tree {
	margin-left: 25px;
}
</style>
