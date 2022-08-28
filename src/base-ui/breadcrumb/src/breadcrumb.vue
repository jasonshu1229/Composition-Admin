<template>
	<div class="sh-breadcrumb">
		<el-breadcrumb :separator-icon="ArrowRight">
			<template v-for="item in breadcrumbs" :key="item.name">
				<el-breadcrumb-item :to="{ path: item.path }"
					>{{ item.name }}
				</el-breadcrumb-item>
			</template>
		</el-breadcrumb>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue';
import { IBreadcrumb } from '../types';

export default defineComponent({
	name: 'nav-breadcrumb',
	props: {
		breadcrumbs: {
			type: Array as PropType<IBreadcrumb[]>,
			default: () => []
		}
	},
	components: {
		ArrowRight
	},
	setup() {
		return {
			ArrowRight
		};
	}
});
</script>

<style scoped lang="less"></style>
