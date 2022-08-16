<template>
	<div class="nav-menu">
		<div class="logo">
			<img class="img" src="~@/assets/img/logo.svg" alt="logo" />
			<span class="title">Vue3+TS</span>
		</div>
		<el-menu
			default-active="2"
			class="el-menu-vertical"
			background-color="#0c2135"
			text-color="#b7bdc3"
			active-text-color="#0a60bd"
		>
			<template v-for="item in userMenus" :key="item.id">
				<template v-if="item.type === 1">
					<el-sub-menu :index="item.id">
						<template #title>
							<el-icon>
								<View />
							</el-icon>
							<span>{{ item.name }}</span>
						</template>
						<template v-for="subitem in item.children" :key="subitem.id">
							<el-menu-item :index="subitem.id">
								<el-icon>
									<StarFilled />
								</el-icon>
								<span>{{ subitem.name }}</span>
							</el-menu-item>
						</template>
					</el-sub-menu>
				</template>
				<template v-else-if="item.type === 2">
					<span>{{ item.name }}</span>
				</template>
			</template>
		</el-menu>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';

export default defineComponent({
	name: '',
	setup() {
		const store = useStore();

		const userMenus = computed(() => store.state.login.userMenus);

		return {
			userMenus
		};
	}
});
</script>

<style scoped lang="less">
.nav-menu {
	height: 100%;
	background-color: #001529;

	.logo {
		display: flex;
		height: 28px;
		padding: 12px 10px 8px 10px;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;

		.img {
			height: 100%;
			margin: 0 10px;
		}

		.title {
			font-size: 16px;
			font-weight: 700;
			color: white;
		}
	}
}
</style>
