<template>
	<div class="app">
		<el-config-provider :locale="locale">
			<router-view></router-view>
		</el-config-provider>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';

// 单个组件引入样式，较为麻烦
// import { ElButton } from 'element-plus';
// import 'element-plus/lib/components/button/style/css';

export default defineComponent({
	name: 'App',
	components: {
		ElConfigProvider
	},
	setup() {
		return {
			locale: zhCn
		};
	}
});
</script>

<style lang="less">
.app {
	height: 100%;
}
</style>
