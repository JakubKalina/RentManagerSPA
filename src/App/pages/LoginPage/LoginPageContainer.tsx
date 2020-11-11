import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteChildrenProps } from 'react-router';

import { PageHeader, Alert, Row, Col } from 'antd';
import { Store } from 'antd/lib/form/interface';

import LoginForm from './components/LoginForm';
import './LoginPageContainer.less';
import { LoginRequest } from 'App/api/endpoints/auth/requests';
import { authenticateUser } from 'App/state/session/session.thunk';
import { RootState } from 'App/state/root.reducer';
import LoadingScreen from 'App/common/components/LoadingScreen';
import StatusType from 'App/types/requestStatus';
import store from 'App/state/store';

interface LoginPageContainerProps extends RouteChildrenProps {
	name?: string;
}

const LoginPageContainer: React.FC<LoginPageContainerProps> = ({ history }: LoginPageContainerProps) => {
	type FinishFormType = (values: Store) => void;

	const dispatch = useDispatch();
	const [loginError, setLoginError] = useState<string[] | boolean>(false);
	const status = useSelector((state: RootState) => state.session.status.authentication);








	// Do usunięcia
	const formInitialValues = {
		email: 'kalinakuba6@gmail.com',
		password: 'Pass123!'
	};



	


	

	const signInHandler: FinishFormType = (values: LoginRequest) => {
		let handleSuccess: () => void = () => {
			history.push('/');
		};

		let handleError: (errorMessages: string[]) => void = (errors: string[]) => {
			setLoginError(errors);
		};

		setLoginError(false);

		dispatch(
			authenticateUser(
				{
					password: values.password,
					email: values.email
				},
				handleSuccess,
				handleError
			)
		);
	};

	return (
		<div className='login--container'>
			{status === StatusType.LOADING ?
				<LoadingScreen container='screen' />
				:
				<Row align='middle' justify='center'>
					<Col xs={22} md={14} xl={10} xxl={8}>
						<br />
						{loginError && (
							<Alert
								message='Error'
								type='error'
								showIcon
								closable
								description={loginError}
								className='w-100'
							/>
						)}
						<PageHeader title={'Zaloguj się'} />
						<LoginForm
							className='login-form'
							name='loginForm'
							size='large'
							onFinish={signInHandler}
							initialValues={formInitialValues}
							autoComplete='off'
						/>
					</Col>
				</Row>
			}
		</div>
	);
};

export default LoginPageContainer;
