import React, { useEffect, useState } from "react";
import StatusType from "App/types/requestStatus";
import { Result, Row, Button, Badge, Col, Typography, Avatar, Input, Table, notification, Modal } from "antd";
import { UserOutlined, ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import LoadingScreen from "App/common/components/LoadingScreen";
import defaultPageQueryParams from "App/common/utils/defaultPageQueryParams";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "App/state/root.reducer";
import { getFlats, createFlat } from "App/state/landlord/flats/flats.thunk";
import { cleanUpFlatStatus } from "App/state/landlord/flats/flats.slice";
import { renderTableColumns } from "../components/FlatTable";
import './LandlordPageGetFlatsContainer.less';
import CreateFlatForm from "../components/CreateFlatForm";
import { Store } from "antd/lib/form/interface";
import { CreateFlatRequest } from "App/api/endpoints/flat/requests/createFlatRequest";


const { LOADING, SUCCESS } = StatusType;


const LandlordPageGetFlatsContainer: React.FC<{}> = () => {

	const dispatch = useDispatch();

	type FinishFormType = (values: Store) => void;

	const flats = useSelector((state: RootState) => state.landlord.flats.flats);
	const flatsStatus = useSelector((state: RootState) => state.landlord.flats.status);

	const [createFlatError, setCreateFlatError] = useState<string[] | boolean>(false);


	const { pageNumber, pageSize, totalNumberOfItems } = useSelector(
		(state: RootState) => state.landlord.flats.getFlatsParams
	);

	useEffect(() => {
		dispatch(getFlats(defaultPageQueryParams));

		return () => {
			dispatch(cleanUpFlatStatus())
		}
	}, [dispatch]);

	const handleTableChange = (pagination: any): any => {
		dispatch(
			getFlats({
				...defaultPageQueryParams,
				pageNumber: pagination.current || 1,
				pageSize: pagination.pageSize || 10,
				query: ''
			})
		);
	};

	const paginationConfig = {
		pageSize,
		current: pageNumber,
		total: totalNumberOfItems,
		showSizeChanger: true
	};


	const [modalLoading, setModalLoading] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);

	  const showModal = () => {
		  setModalVisible(true);

	  };
	
	  const handleOk = () => {

		setModalLoading(true);

	  };
	
	 const handleCancel = () => {

		setModalVisible(false);

	  };


	  const createFlatHandler: FinishFormType = (values: CreateFlatRequest) => {
		let handleSuccess: () => void = () => {
			setModalVisible(false);
			dispatch(getFlats(defaultPageQueryParams));
			values = null;
		};

		let handleError: (errorMessages: string[]) => void = (errors: string[]) => {
			setCreateFlatError(errors);
		};

		setCreateFlatError(false);

		dispatch(
			createFlat(
				{
					description: values.description,
					homeAddress: values.homeAddress,
					city: values.city,
					postalCode: values.postalCode
				},
				handleSuccess,
				handleError
			)
		);
	};



	return (
		<>
			{flatsStatus.deleteFlat === StatusType.SUCCESS &&
			notification.success({
				message: 'Sukces',
				description: `Pomyślnie usunięto mieszkanie`
			})}
			<Row className='add-new-flat--container' align="middle" justify="center" >


				<Button type="primary" onClick={showModal}>
				Dodaj nowe mieszkanie
				</Button>

				<Modal
				visible={modalVisible}
				title="Nowe mieszkanie"
				onOk={handleOk}
				onCancel={handleCancel}
				footer={[
					<Button key="back" onClick={handleCancel}>
					Anuluj
					</Button>,
				]}
				>
					<CreateFlatForm
						className='login-form'
						name='loginForm'
						size='large'
						onFinish={createFlatHandler}
						autoComplete='off'
					/>
				</Modal>

			</Row>
			<Row className='overflow-hidden'>
				<Col span={24}>
					<Table
						pagination={paginationConfig}
						onChange={handleTableChange}
						loading={flatsStatus.getFlats === LOADING}
						columns={renderTableColumns(flats, dispatch)}
						dataSource={flats}
						rowKey='id'
					/>
				</Col>
			</Row>
		</>
	);
};

export default LandlordPageGetFlatsContainer;