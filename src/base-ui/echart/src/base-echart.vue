<template>
	<div class="base-echart">
		<div ref="echartDivRef" :style="{ width: width, height: height }"></div>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults } from 'vue';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';

const echartDivRef = ref<HTMLElement>();

const props = withDefaults(
	defineProps<{
		width?: string;
		height?: string;
		option: EChartsOption;
	}>(),
	{
		width: '100%',
		height: '360px'
	}
);

onMounted(() => {
	const echartInstance = echarts.init(echartDivRef.value!);

	echartInstance.setOption(props.option);
});
</script>

<style scoped lang="less"></style>
