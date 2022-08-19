<template>
	<el-breadcrumb :separator-icon="ArrowRight">
		<el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
		<el-breadcrumb-item>promotion management</el-breadcrumb-item>
		<el-breadcrumb-item>promotion list</el-breadcrumb-item>
		<el-breadcrumb-item>promotion detail</el-breadcrumb-item>
	</el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue';

export default defineComponent({
	name: 'nav-breadcrumb'
});
</script>

<style scoped lang="less"></style>
