import { IForm } from '@/bast-ui/form';

export const searchFormConfig: IForm = {
	labelWidth: '120px',
	itemStyle: '10px 40px',
	// 控制一行显示多少个<el-item>
	// colLayout: {
	// 	span: 24
	// },
	formItems: [
		{
			field: 'id',
			type: 'input',
			label: 'id',
			placeholder: '请输入id'
		},
		{
			field: 'name',
			type: 'input',
			label: '用户名',
			placeholder: '请输入用户名'
		},
		{
			field: 'password',
			type: 'password',
			label: '密码',
			placeholder: '请输入密码'
		},
		{
			field: 'singer',
			type: 'select',
			label: '喜欢的歌手',
			placeholder: '请选择喜欢的歌手',
			options: [
				{
					title: '张杰',
					value: 'Jason Zhang'
				},
				{
					title: '周杰伦',
					value: 'Jay Chou'
				}
			]
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
