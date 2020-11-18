import { AddTenancyFormRules } from "./AddTenancyFormRulesTypes";

export const addTenancyFormRules: AddTenancyFormRules = {


    deposit: [
        {
            required: true,
            message: 'Kaucja jest wymagana'
        }
    ],
    endDate: [
        {
            required: true,
            message: 'Data rozpoczęcia jest wymagana'
        }
    ],
    startDate: [
        {
            required: true,
            message: 'Data zakończenia jest wymagana'
        }
    ]

};
