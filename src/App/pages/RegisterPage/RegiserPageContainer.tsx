import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "antd/lib/form/interface";
import { RootState } from "App/state/root.reducer";
import { RegisterRequest } from "App/api/endpoints/auth/requests";
import { authenticateUser, registerUser } from "App/state/session/session.thunk";
import LoadingScreen from "App/common/components/LoadingScreen";
import { Row, Col, Alert, PageHeader } from "antd";
import StatusType from "App/types/requestStatus";
import RegisterForm from "./components/RegisterForm";
import { useHistory } from "react-router";

const RegisterPageContainer: React.FC<{}> = () => {

	type FinishFormType = (values: Store) => void;

	const dispatch = useDispatch();
	const [registerError, setRegisterError] = useState<string[] | boolean>(false);
    const status = useSelector((state: RootState) => state.session.status.authentication);
    const history = useHistory();


	const signUpHandler: FinishFormType = (values: RegisterRequest) => {
		let handleSuccess: () => void = () => {
			history.push('/profile');
		};

		let handleError: (errorMessages: string[]) => void = (errors: string[]) => {
			setRegisterError(errors);
		};

		setRegisterError(false);

		dispatch(
			registerUser(
				{
					firstName: values.firstName,
					lastName: values.lastName,
					email: values.email,
					password: values.password,
					confirmPassword: values.confirmPassword,
					roles: [values.role],
					language: "pl"
				},
				handleSuccess,
				handleError
				
			)
		);
	};

    
	return (
		<div className='register--container'>
			{status === StatusType.LOADING ?
				<LoadingScreen container='screen' />
				:
				<Row align='middle' justify='center'>
					<Col xs={22} md={14} xl={10} xxl={8}>
						<br />
						{registerError && (
							<Alert
								message='Błąd'
								type='error'
								showIcon
								closable
								description={registerError}
								className='w-100'
							/>
						)}
						<PageHeader title={'Stwórz konto'} />
						<RegisterForm
							className='register-form'
							name='registerForm'
							size='large'
							onFinish={signUpHandler}
							autoComplete='off'
						/>
					</Col>
				</Row>
			}
		</div>
	);
};

export default RegisterPageContainer;