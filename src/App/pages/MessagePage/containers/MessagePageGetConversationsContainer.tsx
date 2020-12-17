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
import { getFlats } from "App/state/tenant/flats/flats.thunk";
import { renderTableColumns } from "../components/ConversationsTable";
import { getConversations } from "App/state/messages/messages.thunk";


const { LOADING, SUCCESS } = StatusType;


const MessagePageGetConversationsContainer: React.FC<{}> = () => {

	const dispatch = useDispatch();

	type FinishFormType = (values: Store) => void;


	const conversations = useSelector((state: RootState) => state.messages.conversations);
	const conversationsStatus = useSelector((state: RootState) => state.messages.status);


	const { pageNumber, pageSize, totalNumberOfItems } = useSelector(
		(state: RootState) => state.messages.getConversationsParams
	);

	useEffect(() => {

		dispatch(getConversations(defaultPageQueryParams));

	}, [dispatch]);

	const handleTableChange = (pagination: any): any => {
		dispatch(


            
			getConversations({
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
						loading={conversationsStatus.getConversations === LOADING}
						columns={renderTableColumns(conversations, dispatch)}
						dataSource={conversations}
						rowKey='id'
					/>
				</Col>
			</Row>
		</>
	);
};

export default MessagePageGetConversationsContainer;