import React from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { FormProps } from 'antd/lib/form/Form';
import './UpdateFlatForm.less';
import { createFlatFormRules } from '../utils/CreateFlatFormRules';
import { updateFlatFormRules } from '../utils/UpdateFlatFormRules';

interface CreateFlatFormProps extends FormProps {
// 	description: string;
// 	homeAddress: string;
// 	city: string;
// 	postalCode: string;
// 
}

const UpdateFlatForm: React.FC<CreateFlatFormProps> = (props: CreateFlatFormProps) => {


	return (
		<Form {...props}>

			<Form.Item name='description' rules={updateFlatFormRules.description}>
				<Input 
				prefix={<UserOutlined 
				className='site-form-item-icon' />} 
				placeholder='Nazwa'
				/>
			</Form.Item>

            <Form.Item name='homeAddress' rules={updateFlatFormRules.homeAddress}>
				<Input 
				prefix={<UserOutlined 
				className='site-form-item-icon' />} 
				placeholder='Adres'
				/>
			</Form.Item>

            <Form.Item name='city' rules={updateFlatFormRules.city}>
				<Input 
				prefix={<UserOutlined 
				className='site-form-item-icon' />} 
				placeholder='Miasto'
				/>
			</Form.Item>

            <Form.Item name='postalCode' rules={updateFlatFormRules.postalCode}>
				<Input prefix={<UserOutlined 
				className='site-form-item-icon' />} 
				placeholder='Kod pocztowy'
				/>
			</Form.Item>

 
			<Form.Item>
				<Button className='f-right login-form-button' type='primary' htmlType='submit' size='large'>
					{'Zapisz zmiany'}
				</Button>
			</Form.Item>
		</Form>
	);
};

export default UpdateFlatForm;
