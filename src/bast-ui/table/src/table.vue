<template>
	<div class="sh-table">
		<el-table :data="listData" border style="width: 100%">
			<template v-for="propItem in propList" :key="propItem.prop">
				<el-table-column v-bind="propItem" align="center">
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
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'sh-table',
	props: {
		listData: {
			type: Array, // 不好判断数组里面都什么元素和类型 所以不用 as PropType
			required: true
		},
		propList: {
			type: Array,
			required: true
		}
	}
});
</script>

<style scoped lang="less"></style>
