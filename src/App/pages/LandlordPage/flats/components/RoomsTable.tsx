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

export const renderRoomsTableColumns = (rooms: RoomForGetLandlordRoomsResponse[], dispatch: Dispatch<any>, flatId: number) => [
	{ title: 'Nazwa', dataIndex: 'name' },

	{
		title: 'Akcje',
		render: (record: RoomForGetLandlordRoomsResponse) => (
			<h1>
				<Dropdown
					overlay={menuForActionDropdown(record, rooms, flatId, dispatch)}
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
	record: RoomForGetLandlordRoomsResponse,
	rooms: RoomForGetLandlordRoomsResponse[],
	flatId: number,
	dispatch: Dispatch<any>) => (
	<Menu>
		{/* <Menu.Item>
			<Button type='link'>
				<Link to={`/landlord/flats/${record.id}/update` }>Edycja</Link>
			</Button>
		</Menu.Item> */}
		<Menu.Item>
			<Button type='link' onClick={confirmRoomDelete(record.id, rooms, flatId, dispatch)}>
				Usuń
			</Button>
		</Menu.Item>
	</Menu>
);

export function confirmRoomDelete(roomId: number, rooms: RoomForGetLandlordRoomsResponse[], flatId: number , dispatch: Dispatch<any>) {
	const { confirm } = Modal;

	return () => {
		const roomToDelete = rooms.find((r) => r.id === roomId);
		confirm({
			title: `Czy na pewno chcesz usunąć pokój ${roomToDelete?.name} ?`,
			icon: <ExclamationCircleOutlined />,
			content: 'Wykonanie tej akcji będzie nieodwracalne!',
			okText: 'Tak',
			okType: 'primary',
			cancelText: 'Nie',
			onOk() {
				dispatch(deleteRoom(flatId, roomId));
			}
		});
	};
}
