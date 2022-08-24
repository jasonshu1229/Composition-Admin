export const contentTableConfig = {
	tableTitle: '角色列表',
	propList: [
		{ prop: 'name', label: '角色名', midWidth: '100' },
		{ prop: 'intro', label: '权限介绍', midWidth: '100' },
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
		{ label: '操作', midWidth: '120', slotName: 'handler' }
	],
	showIndexColumn: true,
	showSelectColumn: true
};
