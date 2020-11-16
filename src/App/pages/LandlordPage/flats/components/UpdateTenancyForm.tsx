import React from 'react';
import { Form, Input, Checkbox, Button, DatePicker } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { FormProps } from 'antd/lib/form/Form';
import './CreateFlatForm.less';
import { createFlatFormRules } from '../utils/CreateFlatFormRules';
import { addTenancyFormRules } from '../utils/AddTenancyFormRules';
import moment from 'moment';

interface UpdateTenancyFormProps extends FormProps {
}

const UpdateTenancyForm: React.FC<UpdateTenancyFormProps> = (props: UpdateTenancyFormProps) => {


	return (
		<Form {...props}>
			<Form.Item name='deposit' rules={addTenancyFormRules.deposit}>
				<Input suffix={'zł'} placeholder='Kaucja' />
			</Form.Item>


			<Form.Item name='startDate' rules={addTenancyFormRules.startDate}>
                <DatePicker style={{width: '100%'}} placeholder='Data rozpoczęcia' />
            </Form.Item>

            
			<Form.Item name='endDate' rules={addTenancyFormRules.endDate}>
                <DatePicker 
                style={{width: '100%'}} 
                placeholder='Data zakończenia' />
            </Form.Item>

 
			<Form.Item>
				<Button className='f-right login-form-button' type='primary' htmlType='submit' size='large'>
					{'Zapisz zmiany'}
				</Button>
			</Form.Item>
		</Form>
	);
};

export default UpdateTenancyForm;
