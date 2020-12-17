import React from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { FormProps } from 'antd/lib/form/Form';

interface SendMessageFormProps extends FormProps {

}

const SendMessageForm: React.FC<SendMessageFormProps> = (props: SendMessageFormProps) => {


	return (
		<Form {...props}>

			<Form.Item name='message'>
				<Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Wiadomość' />
			</Form.Item>

 
			<Form.Item>
				<Button className='f-right login-form-button' type='primary' htmlType='submit' size='large'>
					{'Wyślij'}
				</Button>
			</Form.Item>
		</Form>
	);
};

export default SendMessageForm;
