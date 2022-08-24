<template>
	<div class="page-content-table">
		<sh-table :listData="dataList" v-bind="contentTableConfig">
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

			<!-- 2.列中的插槽 -->
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
						<span> 编辑 </span>
					</el-button>
					<el-button size="small" type="primary" link>
						<el-icon>
							<Delete />
						</el-icon>
						<span>删除</span>
					</el-button>
				</div>
			</template>
		</sh-table>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from '@/store';

import ShTable from '@/bast-ui/table';

export default defineComponent({
	name: 'page-content',
	components: {
		ShTable
	},
	props: {
		contentTableConfig: {
			type: Object,
			required: true
		},
		pageName: {
			type: String,
			required: true
		}
	},
	setup(props) {
		const store = useStore();

		// 发送网络请求
		const getPageData = (queryInfo: any = {}) => {
			store.dispatch('system/getPageListAction', {
				pageName: props.pageName,
				queryInfo: {
					offset: 0,
					size: 10,
					...queryInfo
				}
			});
		};

		getPageData();

		// 从vuex中获取数据
		const dataList = computed(() =>
			store.getters[`system/pageTableListData`](props.pageName)
		);
		// const userCount = computed(() => store.state.system.userCount);

		return {
			dataList,
			getPageData
		};
	}
});
</script>

<style scoped lang="less">
.page-content-table {
	border-top: 20px solid #f5f5f5;
	padding: 20px;
}
</style>
