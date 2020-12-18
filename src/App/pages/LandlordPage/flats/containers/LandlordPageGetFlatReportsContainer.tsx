import React, { useEffect, useState } from "react";
import StatusType from "App/types/requestStatus";
import { Result, Row, Button, Badge, Col, Typography, Avatar, Input, Table, notification, Modal } from "antd";
import { UserOutlined, ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import LoadingScreen from "App/common/components/LoadingScreen";
import defaultPageQueryParams from "App/common/utils/defaultPageQueryParams";
import { Link, RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "App/state/root.reducer";
import { getFlats, createFlat } from "App/state/landlord/flats/flats.thunk";
import { cleanUpFlatStatus } from "App/state/landlord/flats/flats.slice";
import { renderTableColumns } from "../components/FlatTable";
import './LandlordPageGetFlatsContainer.less';
import CreateFlatForm from "../components/CreateFlatForm";
import { Store } from "antd/lib/form/interface";
import { CreateFlatRequest } from "App/api/endpoints/flat/requests/createFlatRequest";
import { getFlatReports, createLandlordReport } from "App/state/landlord/reports/reports.thunk";
import { renderFlatReportsTableColumns } from "../components/FlatReportsTable";
import CreateLandlordReportForm from "../components/CreateLandlordReportForm";
import { CreateLandlordReportRequest } from "App/api/endpoints/report/requests/createlLandlordReportRequest";


const { LOADING, SUCCESS } = StatusType;


interface RouteParams {
	flatId: string;
}

interface LandlordPageGetFlatReportsContainerProps extends RouteComponentProps<RouteParams> {}


const LandlordPageGetFlatReportsContainer: React.FC<LandlordPageGetFlatReportsContainerProps> = ({match}: LandlordPageGetFlatReportsContainerProps) => {

    const dispatch = useDispatch();
    
    const flatId = match.params.flatId;

	type FinishFormType = (values: Store) => void;

	const flatReports = useSelector((state: RootState) => state.landlord.reports.flatReports);
	const flatReportsStatus = useSelector((state: RootState) => state.landlord.reports.status);
    
    const [createLandlordReportError, setCreateLandlordReportError] = useState<string[] | boolean>(false);


	const { pageNumber, pageSize, totalNumberOfItems } = useSelector(
		(state: RootState) => state.landlord.flats.getFlatsParams
	);

	useEffect(() => {
		dispatch(getFlatReports({
            ...defaultPageQueryParams,
            flatId: Number(flatId)
        }));

		return () => {
			dispatch(cleanUpFlatStatus())
		}
	}, [dispatch]);


	const handleTableChange = (pagination: any): any => {
		dispatch(
			getFlatReports({
				...defaultPageQueryParams,
				pageNumber: pagination.current || 1,
				pageSize: pagination.pageSize || 10,
                query: '',
                flatId: Number(flatId)
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


	  const createReportHandler: FinishFormType = (values: CreateLandlordReportRequest) => {
		let handleSuccess: () => void = () => {
			setModalVisible(false);
			dispatch(
                getFlatReports({
                    ...defaultPageQueryParams,
                    pageNumber: 1,
                    pageSize: 10,
                    query: '',
                    flatId: Number(flatId)
                })
            );
			values = null;
		};

		let handleError: (errorMessages: string[]) => void = (errors: string[]) => {
            setCreateLandlordReportError(errors);
		};

		dispatch(
            createLandlordReport({
                flatId: Number(flatId),
                type: values.type,
                description: values.description,
                title: values.title
            },
            handleSuccess,
            handleError
        ));
	};



	return (
		<>

			<Row className='add-new-flat--container' align="middle" justify="center" >


				<Button type="primary" onClick={showModal}>
				Dodaj nowe powiadomienie
				</Button>

				<Modal
				visible={modalVisible}
				title="Nowe powiadomienie"
				onOk={handleOk}
				onCancel={handleCancel}
				footer={[
					<Button key="back" onClick={handleCancel}>
					Anuluj
					</Button>,
				]}
				>
					<CreateLandlordReportForm
						className='report-form'
						name='reportForm'
						size='large'
						onFinish={createReportHandler}
						autoComplete='off'
					/>
				</Modal>

			</Row>
			<Row className='overflow-hidden'>
				<Col span={24}>
					<Table
						pagination={paginationConfig}
						onChange={handleTableChange}
						loading={flatReportsStatus.getFlatReports === LOADING}
						columns={renderFlatReportsTableColumns(flatReports, dispatch)}
						dataSource={flatReports}
						rowKey='id'
					/>
				</Col>
			</Row>
		</>
	);
};

export default LandlordPageGetFlatReportsContainer;