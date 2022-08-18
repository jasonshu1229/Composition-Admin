<template>
	<div class="sh-form">
		<el-form :label-width="labelWidth">
			<el-row>
				<template v-for="item in formItems" :key="item.label">
					<el-col :span="8">
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
								/>
							</template>
							<template v-else-if="item.type === 'select'">
								<el-select :placeholder="item.placeholder" style="width: 100%">
									<el-option
										v-for="option in item.options"
										:key="option.value"
										:value="option.value"
										v-bind="item.otherOptions"
									>
										{{ option.title }}
									</el-option>
								</el-select>
							</template>
							<template v-else-if="item.type === 'datepicker'">
								<el-date-picker
									style="width: 100%"
									v-bind="item.otherOptions"
								></el-date-picker>
							</template>
						</el-form-item>
					</el-col>
				</template>
			</el-row>
		</el-form>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IFormItem } from '../types';

export default defineComponent({
	props: {
		formItems: {
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
		}
	},
	name: 'form'
});
</script>

<style scoped lang="less">
.sh-form {
	padding-top: 22px;
}
</style>
