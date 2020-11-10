import React, { useState } from "react";
import { Row, Col, Alert, PageHeader } from "antd";
import LoadingScreen from "App/common/components/LoadingScreen";
import StatusType from "App/types/requestStatus";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "antd/lib/form/interface";
import { useHistory } from "react-router";
import { RootState } from "App/state/root.reducer";
import { ChangePasswordRequest } from "App/api/endpoints/account/requests";
import { changePassword } from "App/state/session/session.thunk";
import ChangePasswordForm from "../components/ChangePasswordForm";

const ProfilePageChangePasswordContainer: React.FC<{}> = () => {
	type FinishFormType = (values: Store) => void;

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.session.user);
	const [changePasswordError, setChangePasswordError] = useState<string[] | boolean>(false);
    const status = useSelector((state: RootState) => state.session.status.changePassword);
    const history = useHistory();


	const changePasswordHandler: FinishFormType = (values: ChangePasswordRequest) => {
		let handleSuccess: () => void = () => {
			history.push('/profile');
		};

		let handleError: (errorMessages: string[]) => void = (errors: string[]) => {
			setChangePasswordError(errors);
		};

		setChangePasswordError(false);

		dispatch(
			changePassword(
				{
                    newPassword: values.newPassword,
                    currentPassword: values.currentPassword,
                    confirmNewPassword: values.confirmNewPassword
				},
				handleSuccess,
				handleError
				
			)
		);
	};

    
	return (
		<div className='update--profile--container'>
			{status === StatusType.LOADING ?
				<LoadingScreen container='screen' />
				:
				<Row align='middle' justify='center'>
					<Col xs={22} md={14} xl={10} xxl={8}>
						<br />
						{changePasswordError && (
							<Alert
								message='Błąd'
								type='error'
								showIcon
								closable
								description={changePasswordError}
								className='w-100'
							/>
						)}
						<PageHeader title={'Zmień hasło'} />
						<ChangePasswordForm
							className='change-password-form'
							name='changePasswordForm'
							size='large'
							onFinish={changePasswordHandler}
                            autoComplete='off'
						/>
					</Col>
				</Row>
			}
		</div>
	);

};

export default ProfilePageChangePasswordContainer;

