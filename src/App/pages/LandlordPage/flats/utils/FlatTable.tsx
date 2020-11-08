import React, { Dispatch } from 'react';

import { Link } from 'react-router-dom';
import { Tag, Button, Modal, Dropdown, Menu } from 'antd';
import { ExclamationCircleOutlined, SettingFilled } from '@ant-design/icons';

import { deleteUser } from 'App/state/admin/users/users.thunk';
import { UserForGetUsersResponse } from 'App/api/endpoints/admin/responses/getUsersResponse';
import { FlatForGetLandlordFlatsResponse } from 'App/api/endpoints/flat/responses/getLandlordFlatsResponse';
import { deleteFlat } from 'App/state/landlord/flats/flats.thunk';

export const renderTableColumns = (flats: FlatForGetLandlordFlatsResponse[], dispatch: Dispatch<any>) => [
	{
		title: 'Nazwa',
		dataIndex: 'description',
		render: (description, record) => <Link to={`/landlord/flats/${record.id}`}>{description}</Link>
	},
	{ title: 'Adres', dataIndex: ['address', 'homeAddress'] },
    { title: 'Miasto', dataIndex: ['address', 'city'] },
    { title: 'Kod pocztowy', dataIndex: ['address', 'postalCode'] },

	{
		title: 'Akcje',
		render: (record: FlatForGetLandlordFlatsResponse) => (
			<h1>
				<Dropdown
					overlay={menuForActionDropdown(record, flats, dispatch)}
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
	record: FlatForGetLandlordFlatsResponse,
	flats: FlatForGetLandlordFlatsResponse[],
	dispatch: Dispatch<any>) => (
	<Menu>
		<Menu.Item>
			<Button type='link'>
				<Link to={`/landlord/flats/${record.id}/update`}>Edycja</Link>
			</Button>
		</Menu.Item>
		<Menu.Item>
			<Button type='link' onClick={confirmFlatDelete(record.id, flats, dispatch)}>
				Usuń
			</Button>
		</Menu.Item>
	</Menu>
);

export function confirmFlatDelete(flatId: number, flats: FlatForGetLandlordFlatsResponse[], dispatch: Dispatch<any>) {
	const { confirm } = Modal;

	return () => {
		const flatToDelete = flats.find((f) => f.id === flatId);
		confirm({
			title: `Czy na pewno chcesz usunąć mieszkanie ${flatToDelete?.description} ?`,
			icon: <ExclamationCircleOutlined />,
			content: 'Wykonanie tej akcji będzie nieodwracalne!',
			okText: 'Tak',
			okType: 'primary',
			cancelText: 'Nie',
			onOk() {
				dispatch(deleteFlat(flatId));
			}
		});
	};
}
