import { RegisterFormRules } from './registerPageFormRulesTypes';

export const registerFormRules: RegisterFormRules = {
	email: [
		{
			required: true,
			message: 'Email jest wymagany!'
		}
	],
	password: [
		{
			required: true,
			message: 'Hasło jest wymagane!'
		}
	]
};
