<template>
	<div class="user">
		<sh-form v-bind="searchFormConfig" v-model="formData" />
		<div class="content"></div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ShForm from '@/bast-ui/form';
import { searchFormConfig } from './config/search.config';

export default defineComponent({
	name: 'user',
	components: {
		ShForm
	},
	setup() {
		const formData = ref({
			id: '',
			name: '',
			password: '',
			singer: '',
			createTime: ''
		});

		return {
			searchFormConfig,
			formData
		};
	}
});
</script>

<style scoped></style>
