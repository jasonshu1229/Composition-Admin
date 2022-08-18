<template>
	<div class="user">
		<sh-form v-bind="searchFormConfig" />
		<div class="content"></div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ShForm from '@/bast-ui/form';
import { searchFormConfig } from './config/search.config';

export default defineComponent({
	name: 'user',
	components: {
		ShForm
	},
	setup() {
		return {
			searchFormConfig
		};
	}
});
</script>

<style scoped></style>
