import { UpdateProfileFormRules } from "./UpdateProfileFormRulesTypes";

export const updateProfileFormRules: UpdateProfileFormRules = {
    firstName: [
        {
            required: true,
            message: 'Imię jest wymagane'
        }
    ],
    lastName: [
        {
            required: true,
            message: 'Nazwisko jest wymagane'
        }
    ]
};
