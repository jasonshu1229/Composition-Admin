<template>
	<div class="page-search">
		<sh-form v-bind="searchFormConfig" v-model="formData">
			<template #footer>
				<div class="handle-formBtn">
					<el-button @click="handleResetClick">
						<el-icon>
							<Refresh />
						</el-icon>
						<span>重置</span>
					</el-button>
					<el-button type="primary" @click="handleQueryClick">
						<el-icon>
							<Search />
						</el-icon>
						<span>搜索</span>
					</el-button>
				</div>
			</template>
		</sh-form>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ShForm from '@/bast-ui/form';

export default defineComponent({
	name: 'page-search',
	props: {
		searchFormConfig: {
			type: Object,
			required: true
		}
	},
	components: {
		ShForm
	},
	emits: ['resetBtnClick', 'queryBtnClick'],
	setup(props, { emit }) {
		// 双向绑定的属性应该是由配置文件的field来决定
		// formData中的属性应该由 searchFormConfig中的 field 属性 动态来决定
		const formItems = props.searchFormConfig?.formItems ?? [];
		const formOriginData: any = {};
		for (const item of formItems) {
			formOriginData[item.field] = '';
		}
		const formData = ref(formOriginData);

		/**
		 * @description 清空用户输入的数据
		 * 在 form 组件里，formData = ref({ ...props.modelValue })
		 * 	直接赋值不能直接影响到 formData，进而不会清空重置
		 * 	需要更改 formData 里面的属性
		 */
		const handleResetClick = () => {
			for (const key in formOriginData) {
				formData.value[`${key}`] = formOriginData[key];
			}
			// 向 user 组件发出自定义事件
			emit('resetBtnClick');
		};

		/**
		 * @description 按用户输入条件进行搜索
		 */
		const handleQueryClick = () => {
			emit('queryBtnClick', formData.value);
		};

		return {
			formData,
			handleResetClick,
			handleQueryClick
		};
	}
});
</script>

<style scoped lang="less">
.header {
	color: red;
}

.handle-formBtn {
	text-align: right;
	padding: 0 50px 20px 0;
}
</style>
