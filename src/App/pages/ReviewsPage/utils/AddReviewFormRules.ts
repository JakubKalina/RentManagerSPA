import { AddReviewFormRules } from "./AddReviewFormRulesTypes";

export const addReviewFormRules: AddReviewFormRules = {

    rate: [
        {
            required: true,
            message: 'Ocena jest wymagana'
        }
    ],
    description: [
        {
            required: true,
            message: 'Opinia jest wymagana'
        }
    ]

};
