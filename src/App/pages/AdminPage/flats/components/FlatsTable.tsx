import React, { Dispatch } from 'react';

import { Link } from 'react-router-dom';
import { Tag, Button, Modal, Dropdown, Menu } from 'antd';
import { ExclamationCircleOutlined, SettingFilled } from '@ant-design/icons';

import { deleteUser } from 'App/state/admin/users/users.thunk';
import { UserForGetUsersResponse } from 'App/api/endpoints/admin/responses/getUsersResponse';
import { FlatForGetLandlordFlatsResponse } from 'App/api/endpoints/flat/responses/getLandlordFlatsResponse';
import { deleteFlat } from 'App/state/landlord/flats/flats.thunk';

export const renderAdminTableColumns = (flats: FlatForGetLandlordFlatsResponse[], dispatch: Dispatch<any>) => [
	{
		title: 'Nazwa',
		dataIndex: 'description',
	},
	{ title: 'Adres', dataIndex: ['address', 'homeAddress'] },
    { title: 'Miasto', dataIndex: ['address', 'city'] },
    { title: 'Kod pocztowy', dataIndex: ['address', 'postalCode'] },

];
