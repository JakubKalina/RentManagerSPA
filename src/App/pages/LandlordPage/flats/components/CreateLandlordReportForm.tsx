import React from 'react';
import { Form, Input, Checkbox, Button, Radio } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { FormProps } from 'antd/lib/form/Form';
import './CreateFlatForm.less';
import { createFlatFormRules } from '../utils/CreateFlatFormRules';
import TextArea from 'antd/lib/input/TextArea';
import { createLandlordReportFormRules } from '../utils/CreateLandlordReportFormRules';

interface CreateFlatFormProps extends FormProps {}

const CreateLandlordReportForm: React.FC<CreateFlatFormProps> = (props: CreateFlatFormProps) => {


	return (
		<Form {...props}>

			<Form.Item name='title' rules={createLandlordReportFormRules.title}>
				<Input placeholder='Tytuł' />
			</Form.Item>

            <Form.Item name='description' rules={createLandlordReportFormRules.description}>
                <TextArea rows={4} placeholder='Opis' />
			</Form.Item>

            <Form.Item name='type' rules={createLandlordReportFormRules.type}>
                <Radio.Group buttonStyle="outline" size="large">
                    <Radio.Button value="Alert">Usterka</Radio.Button>
                    <Radio.Button value="Info">Informacja</Radio.Button>
                </Radio.Group>
			</Form.Item>

 
			<Form.Item>
				<Button className='f-right login-form-button' type='primary' htmlType='submit' size='large'>
					{'Dodaj'}
				</Button>
			</Form.Item>
		</Form>
	);
};

export default CreateLandlordReportForm;
