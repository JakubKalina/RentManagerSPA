import React, { useEffect } from 'react';
import { RouteComponentProps, useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { Avatar, Badge, Button, Col, Result, Row, Typography } from 'antd';
import LoadingScreen from 'App/common/components/LoadingScreen';
import { getUser } from 'App/state/admin/users/users.thunk';
import { RootState } from 'App/state/root.reducer';
import { StatusType } from 'App/types/requestStatus';
import { cleanUpSelectedUser, cleanUpUserStatus } from 'App/state/admin/users/users.slice';
import { ArrowLeftOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { gold } from '@ant-design/colors';
import { GetUserTabs } from '../components/GetUserTabs';
import { useTranslation } from 'react-i18next';

interface RouteParams {
	userId: string;
}

interface GetUserContainerProps extends RouteComponentProps<RouteParams> {}

const { LOADING } = StatusType;

const GetUserContainer: React.FC<GetUserContainerProps> = ({ match }: GetUserContainerProps) => {
	const userId = match.params.userId;
	const {t} = useTranslation();

	const history = useHistory();
	const dispatch = useDispatch();

	const user = useSelector((state: RootState) => state.admin.users.selectedUser);
	const usersStatus = useSelector((state: RootState) => state.admin.users.status);

	useEffect(() => {
		if (!user) {
			dispatch(getUser(userId));
		}
	}, [dispatch, user, userId]);

	useEffect(() => {
		return () => {
			dispatch(cleanUpUserStatus());
			dispatch(cleanUpSelectedUser());
		};
	}, [dispatch]);

	return usersStatus.getUser === LOADING ? (
		<LoadingScreen container='screen' />
	) : user ? (
		<>
			<Button
				style={{ marginLeft: 16 }}
				onClick={() => history.push('/admin/users')}
				icon={<ArrowLeftOutlined />}
			>
				{t('Buttons.GoBack')}
			</Button>

			<Row justify='center'>
				<Col>
					<Avatar size={128} icon={<UserOutlined />} />
				</Col>
			</Row>
			<Row justify='center'>
				<Col>
					<Badge style={{ color: gold[5] }} count={user.lockoutEnabled ? <LockOutlined /> : 0}>
						<Typography.Text delete={user.isDeleted} strong style={{ fontSize: '1.5rem' }}>
							{user.firstName} {user.lastName}
						</Typography.Text>
					</Badge>
				</Col>
			</Row>
			<Row justify='center'>
				<Col>
					<Badge
						status={user.emailConfirmed ? 'success' : 'default'}
						title={user.emailConfirmed ? t('GetUserContainer.StatusConfirmed') : t('GetUserContainer.StatusUnConfirmed')}
					>
						<Typography.Text type='secondary'>{user.email}</Typography.Text>
					</Badge>
				</Col>
			</Row>
			<GetUserTabs user={user} />
		</>
	) : (
		<Result
			status='404'
			title={t('GetUserContainer.NotFoundResultTitle')}
			subTitle={t('GetUserContainer.NotFoundResultTitle')}
			extra={
				<Button type='primary' onClick={() => history.push('/')}>
					{t('Buttons.BackToHome')}
				</Button>
			}
		/>
	);
};

export default GetUserContainer;
