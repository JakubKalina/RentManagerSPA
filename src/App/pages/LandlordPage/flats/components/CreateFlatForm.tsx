import React from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { FormProps } from 'antd/lib/form/Form';
import './CreateFlatForm.less';
import { createFlatFormRules } from '../utils/CreateFlatFormRules';

interface CreateFlatFormProps extends FormProps {}

const CreateFlatForm: React.FC<CreateFlatFormProps> = (props: CreateFlatFormProps) => {


	return (
		<Form {...props}>

			<Form.Item name='description' rules={createFlatFormRules.description}>
				<Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Nazwa' />
			</Form.Item>

            <Form.Item name='homeAddress' rules={createFlatFormRules.homeAddress}>
				<Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Adres' />
			</Form.Item>

            <Form.Item name='city' rules={createFlatFormRules.city}>
				<Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Miasto' />
			</Form.Item>

            <Form.Item name='postalCode' rules={createFlatFormRules.postalCode}>
				<Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Kod pocztowy' />
			</Form.Item>

 
			<Form.Item>
				<Button className='f-right login-form-button' type='primary' htmlType='submit' size='large'>
					{'Dodaj'}
				</Button>
			</Form.Item>
		</Form>
	);
};

export default CreateFlatForm;
