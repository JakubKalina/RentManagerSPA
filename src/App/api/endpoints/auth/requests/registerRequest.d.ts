export interface RegisterRequest {
	[x: string]: any;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
	roles: Role[];
	language: string;
}
