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
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
	name: 'nav-header',
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
	.fold-menu {
		font-size: 30px;
		cursor: pointer;
	}
}
</style>
