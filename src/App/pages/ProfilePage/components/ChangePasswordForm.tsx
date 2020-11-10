import React from "react";
import { Input, Form, Button } from "antd";
import { FormProps } from "antd/lib/form";
import { UserOutlined, PhoneOutlined, LockOutlined } from "@ant-design/icons";
import './UpdateProfileForm.less';
import { updateProfileFormRules } from "../utils/UpdateProfileFormRules";
import { changePasswordFormRules } from "../utils/ChangePasswordFormRules";

interface ChangePasswordFormProps extends FormProps {}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = (props: ChangePasswordFormProps) => {

    return (
        <Form {...props}>

            {/* Aktualne Hasło */}
			<Form.Item name='currentPassword' rules={changePasswordFormRules.currentPassword}>
				<Input
					prefix={<LockOutlined className='site-form-item-icon' />}
					type='password'
					placeholder='Aktualne hasło'
				/>
			</Form.Item>

            {/*Nowe Hasło */}
			<Form.Item name='newPassword' rules={changePasswordFormRules.newPassword}>
				<Input
					prefix={<LockOutlined className='site-form-item-icon' />}
					type='password'
					placeholder='Nowe hasło'
				/>
			</Form.Item>

            {/*Powtórz nowe Hasło */}
			<Form.Item name='confirmNewPassword' rules={changePasswordFormRules.confirmNewPassword}>
				<Input
					prefix={<LockOutlined className='site-form-item-icon' />}
					type='password'
					placeholder='Powtórz nowe hasło'
				/>
			</Form.Item>

            <Form.Item>
				<Button className='f-left change-password-form-button' type='primary' htmlType='submit' size='large'>
					{'Zapisz zmiany'}
				</Button>
			</Form.Item>

        </Form>
    );
};

export default ChangePasswordForm;
