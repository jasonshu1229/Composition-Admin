export const rules = {
	num: [
		{
			required: true,
			message: '手机号是必传内容的噢~',
			trigger: 'blur'
		},
		{
			pattern: /^1\d{10}$/,
			message: '手机号需要输入11位的噢~',
			trigger: 'blur'
		}
	],
	verifyCode: [
		{
			required: true,
			message: '验证码是必传的噢~',
			trigger: 'blur'
		},
		{
			pattern: /^[a-z0-9]{6}$/,
			message: '由6位字母或数字组合成的噢~',
			trigger: 'blur'
		}
	]
};
