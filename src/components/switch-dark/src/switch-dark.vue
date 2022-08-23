<template>
	<el-switch
		inline-prompt
		v-model="isDark"
		active-color="#0a0a0a"
		inactive-color="#dcdfe6"
		:active-icon="Sunny"
		:inactive-icon="Moon"
		@click="handleSwitchDark()"
	></el-switch>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Sunny, Moon } from '@element-plus/icons-vue';

export default defineComponent({
	name: 'switch-dark',
	setup() {
		const isDark = ref<boolean>(false);

		// 暗黑主题之间切换
		const handleSwitchDark = () => {
			const body = document.documentElement as HTMLElement;
			if (isDark.value) body.setAttribute('class', 'dark');
			else body.setAttribute('class', '');
		};

		return {
			isDark,
			Sunny,
			Moon,
			handleSwitchDark
		};
	}
});
</script>

<style scoped lang="less"></style>
