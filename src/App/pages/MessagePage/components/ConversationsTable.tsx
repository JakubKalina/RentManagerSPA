import React, { Dispatch } from 'react';

import { Link } from 'react-router-dom';
import { Tag, Button, Modal, Dropdown, Menu } from 'antd';
import { ExclamationCircleOutlined, SettingFilled } from '@ant-design/icons';

import { deleteUser } from 'App/state/admin/users/users.thunk';
import { UserForGetUsersResponse } from 'App/api/endpoints/admin/responses/getUsersResponse';
import { FlatForGetLandlordFlatsResponse } from 'App/api/endpoints/flat/responses/getLandlordFlatsResponse';
import { deleteFlat } from 'App/state/landlord/flats/flats.thunk';
import { ConversationForGetConversationsResponse } from 'App/api/endpoints/message/responses/getConversationsResponse';

export const renderTableColumns = (conversations: ConversationForGetConversationsResponse[], dispatch: Dispatch<any>) => [
	{
		title: 'Imię',
		dataIndex: ['user', 'firstName'],
	},
    { title: 'Nazwisko', dataIndex: ['user', 'lastName'] },
    
    {
		title: 'Akcje',
		render: (record: ConversationForGetConversationsResponse) => (
			<h1>
				<Dropdown
					overlay={menuForActionDropdown(record, dispatch)}
					trigger={['click']}
					placement='bottomCenter'
				>
					<Button type='link'>
						<SettingFilled />
					</Button>
				</Dropdown>
			</h1>
		)
	}
];

const menuForActionDropdown = (
	record: ConversationForGetConversationsResponse,
	dispatch: Dispatch<any>) => (
	<Menu>
		<Menu.Item>
			<Button type='link'>
				<Link to={`/messages/${record.user.id}` }>Przeglądaj</Link>
			</Button>
		</Menu.Item>
	</Menu>
);



