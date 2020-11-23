import React, { useEffect, useState } from "react";
import StatusType from "App/types/requestStatus";
import { Result, Row, Button, Badge, Col, Typography, Avatar, Input, Table, notification, Modal } from "antd";
import { UserOutlined, ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import LoadingScreen from "App/common/components/LoadingScreen";
import defaultPageQueryParams from "App/common/utils/defaultPageQueryParams";
import { Link, RouteComponentProps, useHistory } from "react-router-dom";
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
import { getFlatPayments } from "App/state/landlord/payments/payments.thunk";
import { createPaymentRequest } from "App/api/endpoints/payment/requests/createPaymentRequest";
import { renderFlatPaymentsTableColumns } from "../components/FlatPaymentsTable";


const { LOADING, SUCCESS } = StatusType;


interface RouteParams {
	flatId: string;
}

interface LandlordPageGetFlatPaymentsContainerProps extends RouteComponentProps<RouteParams> {}


const LandlordPageGetFlatPaymentsContainer: React.FC<LandlordPageGetFlatPaymentsContainerProps> = ({match}: LandlordPageGetFlatPaymentsContainerProps) => {

	const dispatch = useDispatch();
	const history = useHistory();

    
    const flatId = match.params.flatId;

	type FinishFormType = (values: Store) => void;

	const flatPayments = useSelector((state: RootState) => state.landlord.payments.flatPayments);
	const flatPaymentsStatus = useSelector((state: RootState) => state.landlord.payments.status);
    
    const [createPaymentError, setCreatePaymentError] = useState<string[] | boolean>(false);

	useEffect(() => {
		dispatch(getFlatPayments(Number(flatId)));

	}, [dispatch]);


	const addNewPayment = () => {
		history.push(`/landlord/payments/${flatId}/create`);

	};


	return (
		<>
			<Row className='add-new-payment--container' align="middle" justify="center" >

				<Button type="primary" style={{marginTop: 20, marginBottom: 20}} onClick={addNewPayment}>
					Dodaj nową płatność
				</Button>

			</Row>
			<Row className='overflow-hidden'>
				<Col span={24}>
					<Table
						loading={flatPaymentsStatus.getFlatPayments === LOADING}
						columns={renderFlatPaymentsTableColumns(flatPayments, dispatch, history, flatId)}
						dataSource={flatPayments}
						rowKey='id'
					/>
				</Col>
			</Row>
		</>
	);
};

export default LandlordPageGetFlatPaymentsContainer;