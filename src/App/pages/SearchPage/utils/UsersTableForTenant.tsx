import React, { Dispatch, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { Tag, Button, Modal, Dropdown, Menu } from 'antd';
import { ExclamationCircleOutlined, SettingFilled } from '@ant-design/icons';

import { deleteUser } from 'App/state/admin/users/users.thunk';
import { FlatForGetLandlordFlatsResponse } from 'App/api/endpoints/flat/responses/getLandlordFlatsResponse';
import { deleteFlat } from 'App/state/landlord/flats/flats.thunk';
import { UserForGetUsersResponse } from 'App/api/endpoints/account/responses/getUsersResponse';
import { RootState } from 'App/state/root.reducer';
import { useSelector } from 'react-redux';
import { getUserReviews } from 'App/state/reviews/reviews.thunk';
import defaultPageQueryParams from 'App/common/utils/defaultPageQueryParams';
import { ReviewForGetUserReviewsResponse } from 'App/api/endpoints/review/responses/getUserReviewsResponse';
import StatusType from 'App/types/requestStatus';

export const renderTableColumnsForTenant = (users: UserForGetUsersResponse[], dispatch: Dispatch<any>) => [

	{ title: 'Imię', dataIndex: 'firstName' },
    { title: 'Nazwisko', dataIndex: 'lastName' },
    { title: 'Kod wyszukiwania', dataIndex: 'searchId' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Telefon', dataIndex: 'phoneNumber' },

	{
		title: 'Akcje',
		render: (record: UserForGetUsersResponse) => (
			<h1>
				<Dropdown
					overlay={menuForActionDropdown(record, users, dispatch)}
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
	record: UserForGetUsersResponse,
	users: UserForGetUsersResponse[],
	dispatch: Dispatch<any>) => (
	<Menu>
		<Menu.Item>
			<Button type='link'>
				<Link to={`/reviews/${record.id}`}>Sprawdź opinie</Link>
			</Button>
		</Menu.Item>
		<Menu.Item>
			<Button type='link'>
				<Link to={`/messages/${record.id}/send`}>Wyślij wiadomość</Link>
			</Button>
		</Menu.Item>
	</Menu>
);

