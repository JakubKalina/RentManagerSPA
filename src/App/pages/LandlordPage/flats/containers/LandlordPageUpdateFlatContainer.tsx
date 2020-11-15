import React, { useEffect, useState } from "react";
import StatusType from "App/types/requestStatus";
import { Result, Row, Button, Badge, Col, Typography, Avatar, Input, Table, notification, Modal, PageHeader, Alert } from "antd";
import { UserOutlined, ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import LoadingScreen from "App/common/components/LoadingScreen";
import defaultPageQueryParams from "App/common/utils/defaultPageQueryParams";
import { Link, RouteComponentProps, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "App/state/root.reducer";
import { getFlats, createFlat, getFlat, updateFlat } from "App/state/landlord/flats/flats.thunk";
import { cleanUpFlatStatus } from "App/state/landlord/flats/flats.slice";
import { renderTableColumns } from "../components/FlatTable";
import './LandlordPageGetFlatsContainer.less';
import CreateFlatForm from "../components/CreateFlatForm";
import { Store } from "antd/lib/form/interface";
import { CreateFlatRequest } from "App/api/endpoints/flat/requests/createFlatRequest";
import { UpdateFlatRequest } from "App/api/endpoints/flat/requests/updateFlatRequest";
import UpdateFlatForm from "../components/UpdateFlatForm";


const { LOADING, SUCCESS } = StatusType;

interface RouteParams {
	flatId: string;
}

interface LandlordPageUpdateFlatContainerProps extends RouteComponentProps<RouteParams> {}


const LandlordPageUpdateFlatContainer: React.FC<LandlordPageUpdateFlatContainerProps> = ({ match }: LandlordPageUpdateFlatContainerProps ) => {

	const dispatch = useDispatch();
	const history = useHistory();


	const flatId = match.params.flatId;

	type FinishFormType = (values: Store) => void;

	const [updateFlatError, setUpdateFlatError] = useState<string[] | boolean>(false);
	const status = useSelector((state: RootState) => state.landlord.flats.status.getFlat);
	const flat = useSelector((state: RootState) => state.landlord.flats.selectedFlat);

	useEffect(() => {
		
		let handleSuccess: () => void = () => {
		};

		let handleError: (errorMessages: string[]) => void = (errors: string[]) => {
		};

				dispatch(getFlat(Number(flatId), handleSuccess, handleError));

	}, [dispatch]);


	const updateFlatHandler: FinishFormType = (values: UpdateFlatRequest) => {
		let handleSuccess: () => void = () => {
			history.push('/landlord/flats');
		};

		let handleError: (errorMessages: string[]) => void = (errors: string[]) => {
			setUpdateFlatError(errors);
		};

		setUpdateFlatError(false);

		dispatch(
			updateFlat(
				{
					flatId: Number(flatId),
					description: values.description,
					homeAddress: values.homeAddress,
					city: values.city,
					postalCode: values.postalCode
				}
			, 
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
						{updateFlatError && (
							<Alert
								message='Error'
								type='error'
								showIcon
								closable
								description={updateFlatError}
								className='w-100'
							/>
						)}
						<PageHeader title={'Edytuj mieszkanie'} />
						<UpdateFlatForm

							initialValues={{
								description: flat?flat.description:"",
								homeAddress: flat?flat.address.homeAddress:"",
								city: flat?flat.address.city:"",
								postalCode: flat?flat.address.postalCode:""
							}}
							// description={flat?flat.description:""}
							// homeAddress={flat?flat.address.homeAddress:""}
							// city={flat?flat.address.city:""}
							// postalCode={flat?flat.address.postalCode:""}

							className='login-form'
							name='loginForm'
							size='large'
							onFinish={updateFlatHandler}
							autoComplete='off'
						/>
					</Col>
				</Row>
			}
		</div>
	);
};

export default LandlordPageUpdateFlatContainer;