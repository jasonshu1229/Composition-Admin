// 表单校验规则
export const rules = {
	name: [
		{
			required: true,
			message: '用户名是必传内容~',
			trigger: 'blur'
		},
		{
			pattern: /^[a-z0-9]{5,10}$/,
			message: '用户名必须是5~10个字母或者数字~',
			trigger: 'blur'
		}
	],
	password: [
		{
			required: true,
			message: '密码是必传内容~',
			trigger: 'blur'
		},
		{
			pattern: /^[a-z0-9]{3,}$/, // 表示最少3位以上
			message: '密码必须是3位以上的数字或字母~',
			trigger: 'blur'
		}
	]
};
