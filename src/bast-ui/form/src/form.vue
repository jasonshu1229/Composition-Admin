<template>
	<div class="sh-form">
		<el-form :label-width="labelWidth">
			<el-row>
				<template v-for="item in formItems" :key="item.label">
					<el-col v-bind="colLayout">
						<el-form-item
							:label="item.label"
							:rules="item.rules"
							:style="itemStyle"
						>
							<template
								v-if="item.type === 'input' || item.type === 'password'"
							>
								<el-input
									:placeholder="item.placeholder"
									:show-password="item.type === 'password'"
									v-bind="item.otherOptions"
									v-model="formData[`${item.field}`]"
								/>
							</template>
							<template v-else-if="item.type === 'select'">
								<el-select
									:placeholder="item.placeholder"
									style="width: 100%"
									v-bind="item.otherOptions"
									v-model="formData[`${item.field}`]"
								>
									<el-option
										v-for="option in item.options"
										:key="option.value"
										:value="option.value"
									>
										{{ option.title }}
									</el-option>
								</el-select>
							</template>
							<template v-else-if="item.type === 'datepicker'">
								<el-date-picker
									style="width: 100%"
									v-bind="item.otherOptions"
									v-model="formData[`${item.field}`]"
								></el-date-picker>
							</template>
						</el-form-item>
					</el-col>
				</template>
			</el-row>
		</el-form>
		<div class="footer">
			<slot name="footer"></slot>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import { IFormItem } from '../types';

export default defineComponent({
	props: {
		modelValue: {
			type: Object,
			required: true
		},
		formItems: {
			// 当传进来的属性类型是数组或函数时，要通过 PropType 定义，进而通过泛型确认数组里元素的类型
			type: Array as PropType<IFormItem[]>,
			default: () => []
		},
		labelWidth: {
			type: String,
			default: '100px'
		},
		itemStyle: {
			type: Object,
			default: () => ({ padding: '10px 40px' })
		},
		colLayout: {
			type: Object,
			default: () => ({
				xl: 6, // >= 1920px 24/6 = 4份
				lg: 8, // >= 1200px
				md: 12, // >= 992px
				sm: 24, // >= 768px
				xs: 24 // <= 768px
			})
		}
	},
	name: 'sh-form',
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		// sh-form 组件上 v-model 双向绑定数据
		const formData = ref({ ...props.modelValue });

		watch(
			formData,
			(newValue) => {
				// console.log(newValue);
				emit('update:modelValue', newValue);
			},
			{
				deep: true
			}
		);

		return {
			formData
		};
	}
});
</script>

<style scoped lang="less">
.sh-form {
	padding-top: 22px;
}
</style>
