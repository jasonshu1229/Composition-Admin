<template>
	<div class="dashboard">
		<el-row :gutter="10">
			<el-col :span="7">
				<sh-card title="分类商品数量（饼图）"></sh-card>
			</el-col>
			<el-col :span="10">
				<sh-card title="不同城市商品销量"></sh-card>
			</el-col>
			<el-col :span="7">
				<sh-card title="分类商品数量（玫瑰图）"></sh-card>
			</el-col>
		</el-row>

		<el-row :gutter="10" class="content-row">
			<el-col :span="12">
				<sh-card title="分类商品的销量"></sh-card>
			</el-col>
			<el-col :span="12">
				<sh-card title="不同商品的收藏"></sh-card>
			</el-col>
		</el-row>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useStore } from '@/store';
import ShCard from '@/base-ui/card/index';

export default defineComponent({
	name: 'dashboard',
	components: { ShCard },
	setup() {
		const store = useStore();
		store.dispatch('dashboard/getDashboardDataAction');
		return {};
	}
});
</script>

<style scoped>
.content-row {
	margin-top: 20px;
}
</style>
