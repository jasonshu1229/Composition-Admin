<template>
	<div class="menu-icon">
		<el-icon>
			<template v-if="icon === 'el-icon-monitor'">
				<Monitor />
			</template>
			<template v-else-if="icon === 'el-icon-setting'">
				<Setting />
			</template>
			<template v-else-if="icon === 'el-icon-goods'">
				<Goods />
			</template>
			<template v-else-if="icon === 'el-icon-chat-line-round'">
				<ChatLineRound />
			</template>
		</el-icon>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'menu-icon',
	props: {
		icon: {
			type: String,
			default: 'el-icon-monitor'
		}
	}
});
</script>

<style scoped lang="less"></style>
