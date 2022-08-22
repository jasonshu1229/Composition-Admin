<template>
	<div class="user">
		<page-search :searchFormConfig="searchFormConfig" />
		<div class="tabel-content">
			<sh-table
				:listData="userList"
				:propList="propList"
				:tableTitle="tableTitle"
				:showIndexColumn="showIndexColumn"
				:showSelectColumn="showSelectColumn"
			>
				<!--	1.header中的插槽 -->
				<template #headerHandler>
					<el-button type="primary">
						<el-icon>
							<CirclePlus />
						</el-icon>
						<span>新增用户</span>
					</el-button>
					<el-button type="primary" plain>
						<el-icon>
							<Download />
						</el-icon>
						<span>导出用户数据</span>
					</el-button>
				</template>

				<!--	列中的插槽 -->
				<template #status="scope">
					<el-button
						class="primary"
						plain
						size="small"
						:type="scope.row.enable ? 'success' : 'danger'"
						>{{ scope.row.enable ? '启用' : '禁用' }}
					</el-button>
				</template>
				<template #createAt="scope">
					<span>{{ $filters.formatTime(scope.row.createAt) }}</span>
				</template>
				<template #updateAt="scope">
					<span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
				</template>
				<template #handler>
					<div class="handle-btns">
						<el-button size="small" type="primary" link>
							<el-icon>
								<Edit />
							</el-icon>
							编辑
						</el-button>
						<el-button size="small" type="primary" link>
							<el-icon>
								<Delete />
							</el-icon>
							删除
						</el-button>
					</div>
				</template>
			</sh-table>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import PageSearch from '@/components/page-search';
import ShTable from '@/bast-ui/table/index';
import { searchFormConfig } from './config/search.config';
import { useStore } from '@/store';

export default defineComponent({
	name: 'user',
	components: { PageSearch, ShTable },
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
			{ prop: 'enable', label: '状态', midWidth: '100', slotName: 'status' },
			{
				prop: 'createAt',
				label: '创建时间',
				midWidth: '250',
				slotName: 'createAt'
			},
			{
				prop: 'updateAt',
				label: '更新时间',
				midWidth: '250',
				slotName: 'updateAt'
			},
			{
				label: '操作',
				minWidth: '80',
				slotName: 'handler'
			}
		];

		const tableTitle = '用户列表';
		const showIndexColumn = true;
		const showSelectColumn = true;

		return {
			searchFormConfig,
			tableTitle,
			userList,
			userCount,
			propList,
			showIndexColumn,
			showSelectColumn
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
