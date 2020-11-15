import { UpdateFlatFormRules } from "./UpdateFlatFormRulesTypes";

export const updateFlatFormRules: UpdateFlatFormRules = {
    description: [
        {
            required: true,
            message: 'Nazwa jest wymagana'
        }
    ],
    homeAddress: [
        {
            required: true,
            message: 'Adres jest wymagany'
        }
    ],
    city: [
        {
            required: true,
            message: 'Miasto jest wymagane'
        }
    ],
    postalCode: [
        {
            required: true,
            message: 'Kod pocztowy jest wymagany'
        }
    ]

};
