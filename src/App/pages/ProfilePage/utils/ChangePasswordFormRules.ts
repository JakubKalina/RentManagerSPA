import { ChangePasswordFormRules } from "./ChangePasswordFormRulesTypes";

export const changePasswordFormRules: ChangePasswordFormRules = {
    newPassword: [
        {
            required: true,
            message: 'Nowe hasło jest wymagane'
        }
    ],
    currentPassword: [
        {
            required: true,
            message: 'Aktualne hasło jest wymagane'
        }
    ],
    confirmNewPassword: [
        {
            required: true,
            message: 'Potwierdzenie nowego hasła jest wymagane'
        }
    ],

};
