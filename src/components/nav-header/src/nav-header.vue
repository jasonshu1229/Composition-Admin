<template>
	<div class="nav-header">
		<el-icon class="fold-menu" @click="handleFoldClick">
			<template v-if="isFold">
				<Expand />
			</template>
			<template v-else>
				<Fold />
			</template>
		</el-icon>
		<div class="content">
			<div class="header-le">
				<sh-breadcrumb :breadcrumbs="breadcrumbs" />
			</div>
			<div class="header-ri">
				<SwitchDark />
				<user-info />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { pathMapBreadcrumbs } from '@/utils/map-menu';

import userInfo from './user-info.vue';
import ShBreadcrumb from '@/bast-ui/breadcrumb';
import SwitchDark from '@/components/switch-dark';

import { useStore } from '@/store';
import { useRoute } from 'vue-router';

export default defineComponent({
	name: 'nav-header',
	components: {
		ShBreadcrumb,
		userInfo,
		SwitchDark
	},
	emits: ['foldChange'],
	setup(props, { emit }) {
		const isFold = ref(false);
		const handleFoldClick = () => {
			isFold.value = !isFold.value;
			emit('foldChange', isFold.value);
		};

		// 面包屑的数据
		const store = useStore();
		const breadcrumbs = computed(() => {
			const route = useRoute();
			const currentPath = route.path;
			const userMenus = store.state.login.userMenus;
			return pathMapBreadcrumbs(userMenus, currentPath);
		});

		return {
			isFold,
			breadcrumbs,
			handleFoldClick
		};
	}
});
</script>

<style scoped lang="less">
.nav-header {
	display: flex;
	align-items: center;
	width: 100%;

	.fold-menu {
		font-size: 30px;
		cursor: pointer;
	}

	.content {
		display: flex;
		flex: 1;
		justify-content: space-between;
		align-items: center;
		padding: 0 20px;

		.header-le {
			display: flex;
			align-items: center;
			justify-content: flex-start;
		}

		.header-ri {
			height: 100%;
			width: 100%;
			display: flex;
			align-items: center;
			justify-self: flex-end;
		}
	}
}
</style>
