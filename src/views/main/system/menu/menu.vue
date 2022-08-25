<template>
	<div class="menu">
		<page-content
			pageName="menu"
			:contentTableConfig="contentTableConfig"
		></page-content>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import PageContent from 'components/page-content';
import { contentTableConfig } from './config/content.config';

export default defineComponent({
	name: 'sh-menu',
	components: {
		PageContent
	},
	setup() {
		return {
			contentTableConfig
		};
	}
});
</script>

<style scoped></style>
