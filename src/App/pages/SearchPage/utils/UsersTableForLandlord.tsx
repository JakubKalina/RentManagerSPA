import React, { Dispatch } from 'react';

import { Link } from 'react-router-dom';
import { Tag, Button, Modal, Dropdown, Menu } from 'antd';
import { ExclamationCircleOutlined, SettingFilled } from '@ant-design/icons';

import { deleteUser } from 'App/state/admin/users/users.thunk';
import { FlatForGetLandlordFlatsResponse } from 'App/api/endpoints/flat/responses/getLandlordFlatsResponse';
import { deleteFlat } from 'App/state/landlord/flats/flats.thunk';
import { UserForGetUsersResponse } from 'App/api/endpoints/account/responses/getUsersResponse';

export const renderTableColumnsForLandlord = (users: UserForGetUsersResponse[], dispatch: Dispatch<any>) => [

	{ title: 'Imię', dataIndex: 'firstName' },
    { title: 'Nazwisko', dataIndex: 'lastName' },
    { title: 'Kod wyszukiwania', dataIndex: 'searchId' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Telefon', dataIndex: 'phoneNumber' },
	{ title: 'Rola',
		render: (record: UserForGetUsersResponse) => (
			<Tag.CheckableTag checked={true} style={{marginBottom: "10px"}} >
			{
				record.role==='Landlord'?'Zarządca':""
			}
			{
				record.role==='Administrator'?'Administrator':""
			}
			{
				record.role==='Tenant'?'Najemca':""
			}
			</Tag.CheckableTag>
		)
	},

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
				Napisz wiadomość
			</Button>
		</Menu.Item>

			{
				record.role==='Tenant'?			
				<Menu.Item>
					<Button type='link'>
					<Link to={`/landlord/tenants/add/${record.id}`}>Dodaj do mieszkania</Link>
					</Button>
				</Menu.Item>
				:""
			}


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
