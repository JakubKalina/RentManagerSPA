import React from 'react';
import { Form, Input, Checkbox, Button, DatePicker } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { FormProps } from 'antd/lib/form/Form';
import './CreateFlatForm.less';
import { createFlatFormRules } from '../utils/CreateFlatFormRules';
import { createPaymentFormRules } from '../utils/CreatePaymentFormRules';

interface CreatePaymentFormProps extends FormProps {}

const CreatePaymentForm: React.FC<CreatePaymentFormProps> = (props: CreatePaymentFormProps) => {


	return (
		<Form {...props}>

			<Form.Item name='title' rules={createPaymentFormRules.title}>
				<Input placeholder='Tytuł' />
			</Form.Item>

            <Form.Item name='description' rules={createPaymentFormRules.description}>
				<Input placeholder='Opis' />
			</Form.Item>

			<Form.Item name='dueDate' rules={createPaymentFormRules.dueDate}>
                <DatePicker style={{width: '100%'}} placeholder='Termin płatności' />
            </Form.Item>


            <Form.Item name='amount' rules={createPaymentFormRules.amount}>
				<Input placeholder='Kwota' />
			</Form.Item>

            <Form.Item name='recipientAccountNumber' rules={createPaymentFormRules.recipientAccountNumber}>
				<Input placeholder='Numer konta do płatności' />
			</Form.Item>
 
			<Form.Item>
				<Button className='f-right login-form-button' type='primary' htmlType='submit' size='large'>
					{'Dodaj'}
				</Button>
			</Form.Item>
		</Form>
	);
};

export default CreatePaymentForm;
