<template>
	<div class="user">
		<page-search :searchFormConfig="searchFormConfig" />
		<div class="tabel-content">
			<el-table :data="userList" border style="width: 100%">
				<template v-for="propItem in propList" :key="propItem.prop">
					<el-table-column v-bind="propItem" align="center" />
				</template>
			</el-table>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import PageSearch from '@/components/page-search';
import { searchFormConfig } from './config/search.config';
import { useStore } from '@/store';

export default defineComponent({
	name: 'user',
	components: { PageSearch },
	setup() {
		const store = useStore();
		store.dispatch('system/getPageListAction', {
			pageUrl: '/users/list',
			queryInfo: {
				offset: 0,
				size: 10
			}
		});

		const userList = computed(() => store.state.system.userList);
		const userCount = computed(() => store.state.system.userCount);

		const propList = [
			{ prop: 'name', label: '用户名', midWidth: '100' },
			{ prop: 'realname', label: '真实姓名', midWidth: '100' },
			{ prop: 'cellphone', label: '手机号码', midWidth: '100' },
			{ prop: 'enable', label: '状态', midWidth: '100' },
			{ prop: 'createAt', label: '创建时间', midWidth: '250' },
			{ prop: 'updateAt', label: '更新时间', midWidth: '250' }
		];

		return {
			searchFormConfig,
			userList,
			userCount,
			propList
		};
	}
});
</script>

<style scoped>
.tabel-content {
	border-top: 20px solid #f5f5f5;
	padding: 20px;
}
</style>
