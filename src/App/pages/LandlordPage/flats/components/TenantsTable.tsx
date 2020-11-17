import React, { Dispatch } from 'react';

import { Link } from 'react-router-dom';
import { Tag, Button, Modal, Dropdown, Menu } from 'antd';
import { ExclamationCircleOutlined, SettingFilled } from '@ant-design/icons';

import { deleteUser } from 'App/state/admin/users/users.thunk';
import { UserForGetUsersResponse } from 'App/api/endpoints/admin/responses/getUsersResponse';
import { FlatForGetLandlordFlatsResponse } from 'App/api/endpoints/flat/responses/getLandlordFlatsResponse';
import { deleteFlat, getFlat } from 'App/state/landlord/flats/flats.thunk';
import { RoomForGetLandlordRoomsResponse } from 'App/api/endpoints/room/responses/getLandlordRoomsResponse';
import { deleteRoom } from 'App/state/landlord/rooms/rooms.thunk';
import { GetFlatTenanciesResponse } from 'App/api/endpoints/tenancy/responses/getFlatTenanciesResponse';
import { updateTenancy } from 'App/state/landlord/tenancies/tenancies.thunk';

export const renderTenantsTableColumns = (tenancies: GetFlatTenanciesResponse[], history: any, flatId: number, dispatch: Dispatch<any>) => [
	{ title: 'Imię', dataIndex: ['user', 'firstName'] },
	{ title: 'Nazwisko', dataIndex: ['user', 'lastName'] },
	{ title: 'Kaucja', dataIndex: 'deposit'},
    { title: 'Początek', dataIndex: 'startDate' },
    { title: 'Koniec', dataIndex: 'endDate' },
    { title: 'Pokój', dataIndex: ['room', 'name'] },


	{
		title: 'Akcje',
		render: (record: GetFlatTenanciesResponse) => (
			<h1>
				<Dropdown
					overlay={menuForActionDropdown(record, tenancies, history, flatId, dispatch)}
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
	history: any,
	flatId: number,
	dispatch: Dispatch<any>) => (
	<Menu>
		<Menu.Item>
			<Button type='link'>
				<Link to={`/landlord/tenancy/${record.id}/update` }>
					Edytuj
				</Link>
			</Button>
		</Menu.Item>
		<Menu.Item>
			<Button type='link' onClick={confirmTenancyEnd(record.id, tenancies, history, flatId, dispatch)}>
				Zakończ teraz
			</Button>
		</Menu.Item>
		<Menu.Item>
			<Button type='link'>
				Oceń najemcę
			</Button>
		</Menu.Item>
	</Menu>
);

export function confirmTenancyEnd(tenancyId: number, tenancies: GetFlatTenanciesResponse[], history: any, flatId: number, dispatch: Dispatch<any>) {
	const { confirm } = Modal;

	let handleSuccess: () => void = () => {
		history.push(`/landlord/flats/`);
    };

    let handleError: (errorMessages: string[]) => void = (errors: string[]) => {
	
	};


	return () => {
		const tenancyToEnd = tenancies.find((r) => r.id === tenancyId);
		confirm({
			title: `Czy na pewno chcesz zakończyć najem ?`,
			icon: <ExclamationCircleOutlined />,
			content: 'Wykonanie tej akcji będzie nieodwracalne!',
			okText: 'Tak',
			okType: 'primary',
			cancelText: 'Nie',
			onOk() {

				dispatch(updateTenancy({
					id: tenancyToEnd.id,
					startDate: tenancyToEnd.startDate,
					endDate: new Date(),
					deposit: tenancyToEnd.deposit
				}, handleSuccess, handleError));
			}
		});
	};
}
