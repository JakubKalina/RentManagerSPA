import React, { Dispatch } from 'react';

import { Link } from 'react-router-dom';
import { Tag, Button, Modal, Dropdown, Menu } from 'antd';
import { ExclamationCircleOutlined, SettingFilled } from '@ant-design/icons';

import { deleteUser } from 'App/state/admin/users/users.thunk';
import { UserForGetUsersResponse } from 'App/api/endpoints/admin/responses/getUsersResponse';
import { FlatForGetLandlordFlatsResponse } from 'App/api/endpoints/flat/responses/getLandlordFlatsResponse';
import { deleteFlat } from 'App/state/landlord/flats/flats.thunk';
import { RoomForGetLandlordRoomsResponse } from 'App/api/endpoints/room/responses/getLandlordRoomsResponse';
import { deleteRoom } from 'App/state/landlord/rooms/rooms.thunk';
import { GetFlatTenanciesResponse } from 'App/api/endpoints/tenancy/responses/getFlatTenanciesResponse';

export const renderTenantsTableColumns = (tenancies: GetFlatTenanciesResponse[], dispatch: Dispatch<any>) => [
	{ title: 'Imię', dataIndex: ['user', 'firstName'] },
    { title: 'Nazwisko', dataIndex: ['user', 'lastName'] },
    { title: 'Początek', dataIndex: 'startDate' },
    { title: 'Koniec', dataIndex: 'endDate' },
    { title: 'Pokój', dataIndex: ['room', 'name'] },


	{
		title: 'Akcje',
		render: (record: GetFlatTenanciesResponse) => (
			<h1>
				<Dropdown
					overlay={menuForActionDropdown(record, tenancies, dispatch)}
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
	record: GetFlatTenanciesResponse,
	tenancies: GetFlatTenanciesResponse[],
	dispatch: Dispatch<any>) => (
	<Menu>
		{/* <Menu.Item>
			<Button type='link'>
				<Link to={`/landlord/flats/${record.id}/update` }>Edycja</Link>
			</Button>
		</Menu.Item> */}
		<Menu.Item>
			<Button type='link' onClick={confirmTenancyDelete(record.id, tenancies, dispatch)}>
				Usuń
			</Button>
		</Menu.Item>
	</Menu>
);

export function confirmTenancyDelete(roomId: number, rooms: GetFlatTenanciesResponse[], dispatch: Dispatch<any>) {
	const { confirm } = Modal;

	return () => {
		const roomToDelete = rooms.find((r) => r.id === roomId);
		confirm({
			title: `Czy na pewno chcesz zakończyć najem ?`,
			icon: <ExclamationCircleOutlined />,
			content: 'Wykonanie tej akcji będzie nieodwracalne!',
			okText: 'Tak',
			okType: 'primary',
			cancelText: 'Nie',
			onOk() {
				//dispatch(deleteRoom(roomId));
			}
		});
	};
}
