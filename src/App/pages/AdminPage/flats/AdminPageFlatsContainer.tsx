import React, { useEffect, useState } from "react";
import StatusType from "App/types/requestStatus";
import { Result, Row, Button, Badge, Col, Typography, Avatar, Input, Table, notification, Modal } from "antd";
import { UserOutlined, ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import LoadingScreen from "App/common/components/LoadingScreen";
import defaultPageQueryParams from "App/common/utils/defaultPageQueryParams";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "App/state/root.reducer";
import { cleanUpFlatStatus } from "App/state/landlord/flats/flats.slice";
import { Store } from "antd/lib/form/interface";
import { CreateFlatRequest } from "App/api/endpoints/flat/requests/createFlatRequest";
import { renderAdminTableColumns } from "./components/FlatsTable";
import { getFlats } from "App/state/admin/flats/flats.thunk";


const { LOADING, SUCCESS } = StatusType;


const AdminPageGetFlatsContainer: React.FC<{}> = () => {

	const dispatch = useDispatch();


	const flats = useSelector((state: RootState) => state.admin.flats.flats);
	const flatsStatus = useSelector((state: RootState) => state.admin.flats.status);



	const { pageNumber, pageSize, totalNumberOfItems } = useSelector(
		(state: RootState) => state.admin.flats.getFlatsParams
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


	return (
		<>
			<Row className='overflow-hidden'>
				<Col span={24}>
					<Table
						pagination={paginationConfig}
						onChange={handleTableChange}
						loading={flatsStatus.getFlats === LOADING}
						columns={renderAdminTableColumns(flats, dispatch)}
						dataSource={flats}
						rowKey='id'
					/>
				</Col>
			</Row>
		</>
	);
};

export default AdminPageGetFlatsContainer;