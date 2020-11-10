import { Rule } from 'antd/lib/form';

export interface ChangePasswordFormRules {
    newPassword: Rule[];
    currentPassword: Rule[];
    confirmNewPassword: Rule[];
}
