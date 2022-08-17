<template>
	<div class="nav-menu">
		<div class="logo">
			<img class="img" src="~@/assets/img/logo.svg" alt="logo" />
			<span v-if="!collapse" class="title">Vue3+TS</span>
		</div>
		<el-menu
			:collapse="collapse"
			:collapse-transition="true"
			default-active="2"
			class="el-menu-vertical"
			background-color="#0c2135"
			text-color="#b7bdc3"
			active-text-color="#0a60bd"
		>
			<template v-for="item in userMenus" :key="item.id">
				<template v-if="item.type === 1">
					<el-sub-menu :index="item.id + ''">
						<template #title>
							<menu-icon :icon="item.icon" />
							<span>{{ item.name }}</span>
						</template>
						<template v-for="subitem in item.children" :key="subitem.id">
							<el-menu-item :index="subitem.id + ''">
								<el-icon>
									<StarFilled />
								</el-icon>
								<span>{{ subitem.name }}</span>
							</el-menu-item>
						</template>
					</el-sub-menu>
				</template>
				<template v-else-if="item.type === 2">
					<el-menu-item>
						<span>{{ item.name }}</span>
					</el-menu-item>
				</template>
			</template>
		</el-menu>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from '@/store';
import menuIcon from './menu-icon.vue';
import MenuIcon from 'components/nav-menu/src/menu-icon.vue';

export default defineComponent({
	components: { MenuIcon },
	props: {
		collapse: {
			type: Boolean,
			default: false
		}
	},
	setup() {
		const store = useStore();

		const userMenus = computed(() => store.state.login.userMenus);

		return {
			menuIcon,
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

	.el-menu {
		border: none;
	}

	// 目录
	.el-submenu {
		background-color: #001529 !important;
		// 二级菜单 ( 默认背景 )
		.el-menu-item {
			padding-left: 50px !important;
			background-color: #0c2135 !important;
		}
	}

	::v-deep .el-submenu__title {
		background-color: #001529 !important;
	}

	// hover 高亮
	.el-menu-item:hover {
		color: #fff !important; // 菜单
	}

	.el-menu-item.is-active {
		color: #fff !important;
		background-color: #0a60bd !important;
	}
}

.el-menu-vertical:not(.el-menu--collapse) {
	width: 100%;
	height: calc(100% - 48px);
}
</style>
