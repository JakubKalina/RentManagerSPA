import React from 'react';
import { Form, Input, Checkbox, Button, Rate } from 'antd';
import { UserOutlined, LockOutlined, FormOutlined } from '@ant-design/icons';
import { FormProps } from 'antd/lib/form/Form';
import TextArea from 'antd/lib/input/TextArea';
import { addReviewFormRules } from '../utils/AddReviewFormRules';

interface CreateTenantReviewFormProps extends FormProps {}

const CreateTenantReviewForm: React.FC<CreateTenantReviewFormProps> = (props: CreateTenantReviewFormProps) => {


	return (
		<Form {...props}>

			<Form.Item name='rate' rules={addReviewFormRules.rate} >
				<Rate/>
			</Form.Item>

            <Form.Item name='description' rules={addReviewFormRules.description} >
				<TextArea rows={4} placeholder='Opinia' />
			</Form.Item>
 
			<Form.Item>
				<Button className='f-right login-form-button' type='primary' htmlType='submit' size='large'>
					{'Dodaj opinię'}
				</Button>
			</Form.Item>
		</Form>
	);
};

export default CreateTenantReviewForm;
