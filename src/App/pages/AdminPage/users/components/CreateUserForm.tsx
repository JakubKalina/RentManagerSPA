import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import { createUserFormRules } from '../utils/usersFormRules';
import { CreateUserRequest } from 'App/api/endpoints/admin/requests';
import { useTranslation } from 'react-i18next';

interface CreateUserFormProps {
	onFinish: (values: CreateUserRequest) => void;
	initialValues: CreateUserRequest;
	loading: boolean;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ initialValues, loading, onFinish }) => {
	const { t } = useTranslation();

	const layout = {
		labelCol: { span: 8 },
		wrapperCol: { span: 8 },
	};

	const tailLayout = {
		wrapperCol: { offset: 8, span: 8 }
	};

	return (
		<Form {...layout} layout='horizontal' initialValues={initialValues} onFinish={onFinish}>
			<Form.Item label={t('Form.Labels.Email')} name='email' rules={createUserFormRules.email}>
				<Input placeholder={t('Form.Placeholders.Email')} />
			</Form.Item>

			<Form.Item label={t('Form.Labels.Password')} name='password' rules={createUserFormRules.password}>
				<Input type='password' placeholder={t('Form.Placeholders.Password')} />
			</Form.Item>

			<Form.Item label={t('Form.Labels.FirstName')} name='firstName' rules={createUserFormRules.firstName}>
				<Input placeholder={t('Form.Placeholders.FirstName')} />
			</Form.Item>

			<Form.Item label={t('Form.Labels.LastName')} name='lastName' rules={createUserFormRules.lastName}>
				<Input placeholder={t('Form.Placeholders.LastName')} />
			</Form.Item>

			<Form.Item name='roles' label={t('Form.Labels.Roles')} rules={createUserFormRules.roleName}>
				<Select mode='multiple' placeholder={t('Form.Placeholders.SelectRoles')}>
					<Select.Option value='User'>{t('Roles.User')}</Select.Option>
					<Select.Option value='Administrator'>{t('Roles.Administrator')}</Select.Option>
				</Select>
			</Form.Item>

			<Form.Item name='language' noStyle>
				<Input type='hidden' />
			</Form.Item>

			<Form.Item {...tailLayout}>
				<Button block loading={loading} type='primary' htmlType='submit'>
					{t('Buttons.Create')}
				</Button>
			</Form.Item>
		</Form>
	);
};

export default CreateUserForm;
