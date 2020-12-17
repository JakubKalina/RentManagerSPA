import React, { useEffect } from "react";
import StatusType from "App/types/requestStatus";
import { Row, Col, Table } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "App/state/root.reducer";
import { renderTenantPaymentsTableColumns } from "./components/TenantPaymentsTable";
import { getTenantPayments } from "App/state/tenant/payments/payments.thunk";


const { LOADING } = StatusType;


const TenantPageGetPaymentsContainer: React.FC<{}> = () => {

	const dispatch = useDispatch();

	const tenantPayments = useSelector((state: RootState) => state.tenant.payments.tenantPayments);
	const tenantPaymentsStatus = useSelector((state: RootState) => state.tenant.payments.status);

	useEffect(() => {
		dispatch(getTenantPayments());

	}, [dispatch]);


	return (
		<>
			<Row className='overflow-hidden'>
				<Col span={24}>
					<Table
						loading={tenantPaymentsStatus.getTenantPayments === LOADING}
						columns={renderTenantPaymentsTableColumns(tenantPayments)}
						dataSource={tenantPayments}
						rowKey='id'
					/>
				</Col>
			</Row>
		</>
	);
};

export default TenantPageGetPaymentsContainer;