import React, { Dispatch } from 'react';

import { Link } from 'react-router-dom';
import { Tag, Button, Modal, Dropdown, Menu } from 'antd';
import { ExclamationCircleOutlined, SettingFilled } from '@ant-design/icons';

import { deleteUser } from 'App/state/admin/users/users.thunk';
import { UserForGetUsersResponse } from 'App/api/endpoints/admin/responses/getUsersResponse';
import { FlatForGetLandlordFlatsResponse } from 'App/api/endpoints/flat/responses/getLandlordFlatsResponse';
import { deleteFlat } from 'App/state/landlord/flats/flats.thunk';
import { ReportForGetFlatReportsResponse } from 'App/api/endpoints/report/responses/getFlatReportsResponse';
import { deleteReportStart } from 'App/state/landlord/reports/reports.slice';
import { deleteReport } from 'App/state/landlord/reports/reports.thunk';

export const renderFlatReportsTableColumns = (reports: ReportForGetFlatReportsResponse[], dispatch: Dispatch<any>) => [
    {
        title: 'Typ',
        dataIndex: 'type'
    },
    {
        title: 'Tytuł',
        dataIndex: 'title'
    },
    {
        title: 'Dodano dnia',
        dataIndex: 'createdAt'
    },
    {
		title: 'Dodano przez',
		render: (record: ReportForGetFlatReportsResponse) => (
			<>
                {record.senderFirstName} {record.senderLastName}
			</>
		)
	},
    {
        title: 'Treść',
        dataIndex: 'description'
    },

	{
		title: 'Akcje',
		render: (record: ReportForGetFlatReportsResponse) => (
			<h1>
				<Dropdown
					overlay={menuForActionDropdown(record, reports, dispatch)}
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
	record: ReportForGetFlatReportsResponse,
	reports: ReportForGetFlatReportsResponse[],
	dispatch: Dispatch<any>) => (
	<Menu>
		<Menu.Item>
			<Button type='link' onClick={confirmFlatDelete(record.id, reports, dispatch)}>
				Usuń
			</Button>
		</Menu.Item>
	</Menu>
);

export function confirmFlatDelete(flatId: number, flats: ReportForGetFlatReportsResponse[], dispatch: Dispatch<any>) {
	const { confirm } = Modal;

	return () => {
		const reportToDelete = flats.find((f) => f.id === flatId);
		confirm({
			title: `Czy na pewno chcesz usunąć powiadomienie ${reportToDelete?.description} ?`,
			icon: <ExclamationCircleOutlined />,
			content: 'Wykonanie tej akcji będzie nieodwracalne!',
			okText: 'Tak',
			okType: 'primary',
			cancelText: 'Nie',
			onOk() {
				dispatch(deleteReport(reportToDelete.id));
			}
		});
	};
}
