import { RegisterFormRules } from './registerPageFormRulesTypes';

export const registerFormRules: RegisterFormRules = {
	firstName: [
		{
			required: true,
			message: 'Imię jest wymagane!'
		}
	],
	lastName: [
		{
			required: true,
			message: 'Nazwisko jest wymagane!'
		}
	],
	role: [
		{
			required: true,
			message: 'Rola jest wymagana!'
		}
	],
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
