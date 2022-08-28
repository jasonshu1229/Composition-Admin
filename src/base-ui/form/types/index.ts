type IFormType = 'input' | 'password' | 'select' | 'datepicker';

export interface IFormItem {
	type: IFormType;
	label: string;
	rules?: any[];
	placeholder?: any;
	// 针对 select
	options?: any[];
	// 针对特殊的属性 比如 datePicker
	otherOptions?: any;
	field: string;
	isHidden?: boolean;
}

export interface IForm {
	formItems: IFormItem[];
	labelWidth: string;
	itemStyle?: any;
	colLayout?: any;
}
