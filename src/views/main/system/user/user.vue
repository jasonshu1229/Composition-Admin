<template>
	<div class="user">
		<sh-form :formItems="formItems" />
		<div class="content"></div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ShForm, { IFormItem } from '@/bast-ui/form';

export default defineComponent({
	name: 'user',
	components: {
		ShForm
	},
	setup() {
		const formItems: IFormItem[] = [
			{
				type: 'input',
				label: '用户名',
				placeholder: '请输入用户名'
			},
			{
				type: 'password',
				label: '密码',
				placeholder: '请输入密码'
			},
			{
				type: 'select',
				label: '喜欢的歌手',
				placeholder: '请选择喜欢的歌手',
				options: [
					{
						title: '张杰',
						value: 'Jason Zhang'
					},
					{
						title: '周杰伦',
						value: 'Jay Chou'
					}
				]
			},
			{
				type: 'datepicker',
				label: '创建时间',
				otherOptions: {
					startPlaceholder: '开始时间',
					endPlaceholder: '结束时间',
					type: 'daterange'
				}
			}
		];

		const labelWidth = '120px';
		const itemStyle = '10px 40px';

		return {
			formItems,
			labelWidth,
			itemStyle
		};
	}
});
</script>

<style scoped></style>
