import { Rule } from 'antd/lib/form';

export interface CreatePaymentFormRules {
    title: Rule[];
    description: Rule[];
    amount: Rule[];
    dueDate: Rule[];
    recipientAccountNumber: Rule[];
}
