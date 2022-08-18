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
			<div>面包屑</div>
			<user-info />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import userInfo from './user-info.vue';

export default defineComponent({
	name: 'nav-header',
	components: {
		userInfo
	},
	emits: ['foldChange'],
	setup(props, { emit }) {
		const isFold = ref(false);
		const handleFoldClick = () => {
			isFold.value = !isFold.value;
			emit('foldChange', isFold.value);
		};

		return {
			isFold,
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
	}
}
</style>
