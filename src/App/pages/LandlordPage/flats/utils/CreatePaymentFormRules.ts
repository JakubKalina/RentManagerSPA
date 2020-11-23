import { CreatePaymentFormRules } from "./CreatePaymentFormRulesTypes";

export const createPaymentFormRules: CreatePaymentFormRules = {
    title: [
        {
            required: true,
            message: 'Tytuł jest wymagany'
        }
    ],
    description: [
        {
            required: true,
            message: 'Opis jest wymagany'
        }
    ],
    amount: [
        {
            required: true,
            message: 'Kwota jest wymagana'
        }
    ],
    dueDate: [
        {
            required: true,
            message: 'Termin płatności jest wymagany'
        }
    ],
    recipientAccountNumber: [
        {
            required: true,
            message: 'Numer konta jest wymagany'
        }
    ]


};
