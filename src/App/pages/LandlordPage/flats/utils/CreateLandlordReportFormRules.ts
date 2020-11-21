import { CreateLandlordReportFormRules } from "./CreateLandlordReportFormRulesTypes";

export const createLandlordReportFormRules: CreateLandlordReportFormRules = {

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
    type: [
        {
            required: true,
            message: 'Typ jest wymagany'
        }
    ]

};
