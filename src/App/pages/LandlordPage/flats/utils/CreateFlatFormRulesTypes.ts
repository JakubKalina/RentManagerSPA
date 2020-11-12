import { Rule } from 'antd/lib/form';

export interface CreateFlatFormRules {
	description: Rule[];
    homeAddress: Rule[];
    city: Rule[];
    postalCode: Rule[];
}
