import React, { useState } from "react";
import { Row, Card, Avatar, Tag, Form, Button, Input, Col, PageHeader, Alert } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { devalidateSession, updateUserDetails } from "App/state/session/session.thunk";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "App/state/root.reducer";
import { Store } from "antd/lib/form/interface";
import { UpdateProfileRequest } from "App/api/endpoints/account/requests";
import UpdateProfileForm from "../components/UpdateProfileForm";
import LoadingScreen from "App/common/components/LoadingScreen";
import StatusType from "App/types/requestStatus";


const ProfilePageUpdateProfileContainer: React.FC<{}> = () => {

	type FinishFormType = (values: Store) => void;

    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.session.user);
	const [updateProfileError, setUpdateProfileError] = useState<string[] | boolean>(false);
    const status = useSelector((state: RootState) => state.session.status.updateUserDetails);
    const history = useHistory();


	const updateProfileHandler: FinishFormType = (values: UpdateProfileRequest) => {
		let handleSuccess: () => void = () => {
			history.push('/profile');
		};

		let handleError: (errorMessages: string[]) => void = (errors: string[]) => {
			setUpdateProfileError(errors);
		};

		setUpdateProfileError(false);

		dispatch(
			updateUserDetails(
				{
					firstName: values.firstName,
					lastName: values.lastName,
                    phoneNumber: values.phoneNumber,
                    isDeleted: false
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
						{updateProfileError && (
							<Alert
								message='Błąd'
								type='error'
								showIcon
								closable
								description={updateProfileError}
								className='w-100'
							/>
						)}
						<PageHeader title={'Edytuj dane'} />
						<UpdateProfileForm
							className='update-profile-form'
							name='updateProfileForm'
							size='large'
							onFinish={updateProfileHandler}
                            autoComplete='off'
                            firstName={user?user.firstName:""}
                            lastName={user?user.lastName:""}
                            phoneNumber={user?user.phoneNumber:""}
						/>
					</Col>
				</Row>
			}
		</div>
	);

};


export default ProfilePageUpdateProfileContainer;