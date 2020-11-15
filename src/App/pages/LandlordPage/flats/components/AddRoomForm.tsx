import React from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { FormProps } from 'antd/lib/form/Form';
import './CreateFlatForm.less';
import { createFlatFormRules } from '../utils/CreateFlatFormRules';

interface AddRoomFormProps extends FormProps {

}

const AddRoomForm: React.FC<AddRoomFormProps> = (props: AddRoomFormProps) => {


	return (
		<Form {...props}>

			<Form.Item name='name' rules={createFlatFormRules.description}>
				<Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Nazwa' />
			</Form.Item>

 
			<Form.Item>
				<Button className='f-right login-form-button' type='primary' htmlType='submit' size='large'>
					{'Dodaj'}
				</Button>
			</Form.Item>
		</Form>
	);
};

export default AddRoomForm;
