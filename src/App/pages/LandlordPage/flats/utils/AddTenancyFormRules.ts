import { AddTenancyFormRules } from "./AddTenancyFormRulesTypes";

export const addTenancyFormRules: AddTenancyFormRules = {


    deposit: [
        {
            required: true,
            message: 'Nazwa jest wymagana'
        }
    ],
    endDate: [
        {
            required: true,
            message: 'Nazwa jest wymagana'
        }
    ],
    startDate: [
        {
            required: true,
            message: 'Nazwa jest wymagana'
        }
    ]

};
