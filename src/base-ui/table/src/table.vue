<template>
	<div class="sh-table">
		<div class="header">
			<slot name="header">
				<div class="title">{{ tableTitle }}</div>
				<div class="handle">
					<slot name="headerHandler"></slot>
				</div>
			</slot>
		</div>
		<el-table
			:data="listData"
			border
			style="width: 100%"
			@selection-change="handleSelectionChange"
			v-bind="childrenProps"
		>
			<el-table-column
				v-if="showSelectColumn"
				type="selection"
				align="center"
				width="60"
			></el-table-column>
			<el-table-column
				v-if="showIndexColumn"
				type="index"
				label="序号"
				align="center"
				width="80"
			></el-table-column>
			<template v-for="propItem in propList" :key="propItem.prop">
				<el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
					<template #default="scope">
						<!--插槽的名字不能写死，否则只能改对应的列-->
						<!-- :name 更改对应插槽的列，:row 将插槽里的信息传递到外层使用的组件中						-->
						<slot :name="propItem.slotName" :row="scope.row">
							{{ scope.row[propItem.prop] }}
						</slot>
					</template>
				</el-table-column>
			</template>
		</el-table>
		<div class="footer" v-if="showFooter">
			<slot name="footer">
				<el-pagination
					:page-size="page.pageSize"
					:current-page="page.currentPage"
					:page-sizes="[10, 20, 30, 40]"
					:small="small"
					layout="total, sizes, prev, pager, next, jumper"
					:total="listCount"
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
				/>
			</slot>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
	name: 'sh-table',
	props: {
		tableTitle: {
			type: String,
			default: ''
		},
		listData: {
			type: Array, // 不好判断数组里面都什么元素和类型 所以不用 as PropType
			required: true
		},
		listCount: {
			type: Number,
			default: 0
		},
		propList: {
			type: Array,
			required: true
		},
		showIndexColumn: {
			type: Boolean,
			default: false
		},
		showSelectColumn: {
			type: Boolean,
			default: false
		},
		page: {
			type: Object,
			default: () => ({ currentPage: 1, pageSize: 10 })
		},
		childrenProps: {
			type: Object,
			default: () => ({})
		},
		showFooter: {
			type: Boolean,
			default: true
		}
	},
	emits: ['selectionChange', 'update:page'],
	setup(props, { emit }) {
		const handleSelectionChange = (value: any) => {
			emit('selectionChange', value);
		};

		const small = ref(false);

		const handleSizeChange = (pageSize: number) => {
			console.log('props.page', props.page);
			emit('update:page', { ...props.page, pageSize });
		};
		const handleCurrentChange = (currentPage: number) => {
			console.log('props.page', props.page);
			emit('update:page', { ...props.page, currentPage });
		};

		return {
			small,
			handleSizeChange,
			handleCurrentChange,
			handleSelectionChange
		};
	}
});
</script>

<style scoped lang="less">
.header {
	display: flex;
	height: 45px;
	padding: 0 5px;
	justify-content: space-between;
	align-items: center;

	.title {
		font-size: 20px;
		font-weight: 700;
	}

	.handler {
		align-items: center;
	}
}

.footer {
	margin-top: 15px;

	.el-pagination {
		text-align: right;
		// 具有flex属性的div，text-align 会失效，需要加一下下面的属性进行兼容
		justify-content: flex-end;
	}
}
</style>
