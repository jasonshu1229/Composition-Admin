import { IForm } from '@/base-ui/form';

export const searchFormConfig: IForm = {
	labelWidth: '120px',
	itemStyle: {
		padding: '10px 40px'
	},
	// 控制一行显示多少个<el-item>
	// colLayout: {
	// 	span: 24
	// },
	formItems: [
		{
			field: 'name',
			type: 'input',
			label: '角色名称',
			placeholder: '请输入角色名称'
		},
		{
			field: 'intro',
			type: 'input',
			label: '权限介绍',
			placeholder: '请输入权限介绍'
		},
		{
			field: 'createTime',
			type: 'datepicker',
			label: '创建时间',
			otherOptions: {
				startPlaceholder: '开始时间',
				endPlaceholder: '结束时间',
				type: 'daterange'
			}
		}
	]
};
