import { Rule } from 'antd/lib/form';

export interface RegisterFormRules {
	firstName: Rule[];
	lastName: Rule[];
	email: Rule[];
	password: Rule[];
	role: Rule[];
}
