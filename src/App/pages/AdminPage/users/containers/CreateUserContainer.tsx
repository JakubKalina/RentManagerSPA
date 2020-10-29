import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Row, Col, notification } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

import CreateUserForm from '../components/CreateUserForm';
import { createUser } from 'App/state/admin/users/users.thunk';
import { RootState } from 'App/state/root.reducer';
import { StatusType } from 'App/types/requestStatus';
import Role from 'App/types/role';
import i18next from 'i18next';
import { cleanUpUserStatus } from 'App/state/admin/users/users.slice';
import { CreateUserRequest } from 'App/api/endpoints/admin/requests';
import { useTranslation } from 'react-i18next';

const { LOADING } = StatusType;

export const CreateUserContainer = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const {t} = useTranslation();

	let usersStatus = useSelector((state: RootState) => state.admin.users.status);

	const handleFormSubmit = (values: CreateUserRequest) => {
		dispatch(createUser(values));
	};

	useEffect(() => {
		return () => {
			dispatch(cleanUpUserStatus());
		};
	}, [dispatch]);

	return (
		<React.Fragment>
			<Row className='mb-5'>
				<Col>
					<Button
						style={{ marginLeft: 16 }}
						block
						onClick={() => history.push('/admin/users')}
						icon={<ArrowLeftOutlined />}
					>
						{t('Buttons.GoBack')}
					</Button>
				</Col>
			</Row>
			{usersStatus.createUser === StatusType.SUCCESS &&
				notification.success({ message: 'Sukces', description: 'Pomyślnie dodano użytkownika' })}
			<Row justify='center'>
				<Col span={24}>
					<CreateUserForm
						initialValues={{
							email: 'jan.nowak@gmail.com',
							password: 'Password123!',
							firstName: 'Jan',
							lastName: 'Nowak',
							roles: [Role.USER],
							language: 'pl'
						}}
						loading={usersStatus.createUser === LOADING}
						onFinish={handleFormSubmit}
					/>
				</Col>
			</Row>
		</React.Fragment>
	);
};

export default CreateUserContainer;
