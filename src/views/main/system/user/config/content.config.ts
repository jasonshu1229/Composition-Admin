export const contentTableConfig = {
	tableTitle: '用户列表',
	propList: [
		{ prop: 'name', label: '用户名', midWidth: '100' },
		{ prop: 'realname', label: '真实姓名', midWidth: '100' },
		{ prop: 'cellphone', label: '手机号码', midWidth: '100' },
		{ prop: 'enable', label: '状态', midWidth: '100', slotName: 'status' },
		{
			prop: 'createAt',
			label: '创建时间',
			midWidth: '250',
			slotName: 'createAt'
		},
		{
			prop: 'updateAt',
			label: '更新时间',
			midWidth: '250',
			slotName: 'updateAt'
		},
		{
			label: '操作',
			minWidth: '80',
			slotName: 'handler'
		}
	],
	showIndexColumn: true,
	showSelectColumn: true
};
