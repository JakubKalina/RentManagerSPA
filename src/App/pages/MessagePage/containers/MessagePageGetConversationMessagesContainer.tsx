import React, { useEffect, useState } from "react";
import StatusType from "App/types/requestStatus";
import { Result, Row, Button, Badge, Col, Typography, Avatar, Input, Table, notification, Modal } from "antd";
import { UserOutlined, ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import LoadingScreen from "App/common/components/LoadingScreen";
import defaultPageQueryParams from "App/common/utils/defaultPageQueryParams";
import { Link, RouteComponentProps } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "App/state/root.reducer";
import { cleanUpFlatStatus } from "App/state/landlord/flats/flats.slice";
import { Store } from "antd/lib/form/interface";
import { CreateFlatRequest } from "App/api/endpoints/flat/requests/createFlatRequest";
import { getFlats } from "App/state/tenant/flats/flats.thunk";
import { renderTableColumns } from "../components/ConversationsTable";
import { getConversations, getConversationMessages } from "App/state/messages/messages.thunk";
import { renderMessagesTableColumns } from "../components/ConversationMessagesTable";


const { LOADING, SUCCESS } = StatusType;

interface RouteParams {
	recipientId: string;
}

interface MessagesPageGetConversationMessagesContainerProps extends RouteComponentProps<RouteParams> {}



const MessagePageGetConversationMessagesContainer: React.FC<MessagesPageGetConversationMessagesContainerProps> = ({ match}: MessagesPageGetConversationMessagesContainerProps) => {

	const recipientId = match.params.recipientId;

	const dispatch = useDispatch();

	type FinishFormType = (values: Store) => void;


	const messages = useSelector((state: RootState) => state.messages.messages);
	const messagesStatus = useSelector((state: RootState) => state.messages.status);


	const { pageNumber, pageSize, totalNumberOfItems } = useSelector(
		(state: RootState) => state.messages.getConversationsParams
	);

	useEffect(() => {

		dispatch(getConversationMessages({...defaultPageQueryParams,
			recipientId: recipientId
		}));

	}, [dispatch]);

	const handleTableChange = (pagination: any): any => {
		dispatch(
 
			getConversationMessages({
				...defaultPageQueryParams,
				pageNumber: pagination.current || 1,
				pageSize: pagination.pageSize || 10,
				query: '',
				recipientId: recipientId
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
						loading={messagesStatus.getConversations === LOADING}
						columns={renderMessagesTableColumns(messages, recipientId, dispatch)}
						dataSource={messages}
						rowKey='id'
					/>
					<Button  type="primary" style={{width: '200px', margin: "10px"}}>
                        <Link to={`/messages/${recipientId}/send`}>Odpowiedz</Link>
                    </Button>
				</Col>
			</Row>
		</>
	);
};

export default MessagePageGetConversationMessagesContainer;