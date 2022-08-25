<template>
	<div class="page-content-table">
		<sh-table
			:listData="dataList"
			:listCount="dataCount"
			v-bind="contentTableConfig"
			v-model:page="pageInfo"
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

			<!--	3. 在page-content中动态插入剩余的插槽：一方面兼顾sh-table，另一方面还要给goods 留个插槽		-->
			<template
				v-for="item in otherPropSlots"
				:key="item.prop"
				#[item.slotName]="scope"
			>
				<template v-if="item.slotName">
					<slot :name="item.slotName" :row="scope.row"></slot>
				</template>
			</template>
		</sh-table>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
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

		// 1. 双向绑定一个 pageInfo，需要将它绑定到 table 内部
		const pageInfo = ref({ currentPage: 0, pageSize: 10 });
		// 当pageInfo 改变之后，应该 watch 下，再次请求数据
		watch(pageInfo, () => getPageData());

		// 2. 发送网络请求
		const getPageData = (queryInfo: any = {}) => {
			store.dispatch('system/getPageListAction', {
				pageName: props.pageName,
				queryInfo: {
					offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
					size: pageInfo.value.pageSize,
					...queryInfo
				}
			});
		};

		getPageData();

		// 3. 从vuex中获取数据
		const dataList = computed(() =>
			store.getters[`system/pageTableListData`](props.pageName)
		);
		const dataCount = computed(() =>
			store.getters[`system/pageListTableCount`](props.pageName)
		);

		// 4. 获取其他的动态插槽名称，排除固定的四个
		const otherPropSlots = props.contentTableConfig?.propList.filter(
			(item: any) => {
				if (item.slotName === 'status') return false;
				if (item.slotName === 'createAt') return false;
				if (item.slotName === 'updateAt') return false;
				if (item.slotName === 'handler') return false;

				return true;
			}
		);

		return {
			dataList,
			dataCount,
			pageInfo,
			otherPropSlots,
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

.demo-image__error .image-slot {
	font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
	font-size: 30px;
}

.demo-image__error .el-image {
	width: 100%;
	height: 200px;
}
</style>
