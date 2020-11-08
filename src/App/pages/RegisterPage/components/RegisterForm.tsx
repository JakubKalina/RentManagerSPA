import React from 'react';
import { Form, Input, Checkbox, Button, Radio } from 'antd';
import { UserOutlined, LockOutlined, SendOutlined } from '@ant-design/icons';
import { FormProps } from 'antd/lib/form/Form';
import './RegisterForm.less';
import { registerFormRules } from '../utils/registerPageFormRules';

interface RegisterFormProps extends FormProps {}

const RegisterForm: React.FC<RegisterFormProps> = (props: RegisterFormProps) => {


	return (
		<Form {...props}>

            {/* Imię */}
            <Form.Item name='firstName' rules={registerFormRules.email}>
				<Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Imię' />
			</Form.Item>


            {/* Nazwisko */}
            <Form.Item name='lastName' rules={registerFormRules.email}>
				<Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Nazwisko' />
			</Form.Item>


            {/* Email */}
			<Form.Item name='email' rules={registerFormRules.email}>
				<Input prefix={<SendOutlined className='site-form-item-icon' />} placeholder='Adres Email' />
			</Form.Item>


            {/* Hasło */}
			<Form.Item name='password' rules={registerFormRules.password}>
				<Input
					prefix={<LockOutlined className='site-form-item-icon' />}
					type='password'
					placeholder='Hasło'
				/>
			</Form.Item>

            {/* Powtórz Hasło */}
			<Form.Item name='confirmPassword' rules={registerFormRules.password}>
				<Input
					prefix={<LockOutlined className='site-form-item-icon' />}
					type='password'
					placeholder='Powtórz hasło'
				/>
			</Form.Item>


            {/* Rola */}
            <Form.Item name='role' rules={registerFormRules.password}>
            <Radio.Group buttonStyle="outline" size="large">
                <Radio.Button value="Tenant">Najemca</Radio.Button>
                <Radio.Button value="Landlord">Zarządca</Radio.Button>
            </Radio.Group>
			</Form.Item>



			<Form.Item>
				<Button className='f-left register-form-button' type='primary' htmlType='submit' size='large'>
					{'Zarejestruj'}
				</Button>
			</Form.Item>


		</Form>
	);
};

export default RegisterForm;
