<template>
	<div class="app">
		<router-view></router-view>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import { ElButton } from 'element-plus';
// 单个组件引入样式，较为麻烦
// import 'element-plus/lib/components/button/style/css';

export default defineComponent({
	name: 'App'
});
</script>

<style lang="less">
.app {
	height: 100%;
}
</style>
