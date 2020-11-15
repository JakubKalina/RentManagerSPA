import { Rule } from 'antd/lib/form';

export interface UpdateFlatFormRules {
	description: Rule[];
    homeAddress: Rule[];
    city: Rule[];
    postalCode: Rule[];
}
