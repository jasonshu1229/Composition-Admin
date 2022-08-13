<template>
	<div class="app">
		<h2>{{ $store.state.name }}</h2>

		<router-link to="/login">登录</router-link>
		<router-link to="/main">首页</router-link>
		<router-view></router-view>

		<el-button>Default</el-button>
		<el-button type="primary">Primary</el-button>
		<el-button type="success">Success</el-button>
		<el-button type="info">Info</el-button>
		<el-button type="warning">Warning</el-button>
		<el-button type="danger">Danger</el-button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// import { ElButton } from 'element-plus';
// 单个组件引入样式，较为麻烦
// import 'element-plus/lib/components/button/style/css';

export default defineComponent({
	name: 'App'
	// components: {
	// 	ElButton
	// }
});
</script>

<style lang="less">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
