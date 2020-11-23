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
import { getFlatPaymentsResponse } from 'App/api/endpoints/payment/responses/getFlatPaymentsResponse';
import { deletePayment, updatePayment } from 'App/state/landlord/payments/payments.thunk';
import { getTenancies } from 'App/state/landlord/tenancies/tenancies.thunk';

export const renderFlatPaymentsTableColumns = (payments: getFlatPaymentsResponse[], dispatch: Dispatch<any>, history: any, flatId: string) => [
    {
        title: 'Tytuł',
        dataIndex: 'title'
    },
    {
        title: 'Kwota',
        dataIndex: 'amount'
    },
    {
        title: 'Płatność do',
        dataIndex: 'dueDate'
    },
    {
		title: 'Najemca',
		render: (record: getFlatPaymentsResponse) => (
			<>
                {record.user.firstName} {record.user.lastName}
			</>
		)
	},

	{
		title: 'Akcje',
		render: (record: getFlatPaymentsResponse) => (
			<h1>
				<Dropdown
					overlay={menuForActionDropdown(record, payments, dispatch, history, flatId)}
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
	record: getFlatPaymentsResponse,
	payments: getFlatPaymentsResponse[],
	dispatch: Dispatch<any>,
	history: any,
	flatId: string
	) => (
	<Menu>
		<Menu.Item>
            <Button type='link' onClick={confirmPaymentFinish(record.id, payments, dispatch, history, flatId)}>
				Zaznacz jako opłacona
			</Button>
			<Button type='link' onClick={confirmPaymentDelete(record.id, payments, dispatch)}>
				Usuń
			</Button>
		</Menu.Item>
	</Menu>
);

export function confirmPaymentFinish(paymentId: number, payments: getFlatPaymentsResponse[], dispatch: Dispatch<any>, history: any, flatId: string) {
	const { confirm } = Modal;

	let handleSuccess: () => void = () => {
		history.push(`/landlord/flats/${flatId}`);
		//dispatch(getTenancies(Number(flatId)));
    };

    let handleError: (errorMessages: string[]) => void = (errors: string[]) => {
	
	};

	return () => {
		const paymentToFinish = payments.find((f) => f.id === paymentId);
		confirm({
			title: `Czy na pewno chcesz zaznaczyć ${paymentToFinish?.description} jako opłaconą ?`,
			icon: <ExclamationCircleOutlined />,
			content: 'Wykonanie tej akcji będzie nieodwracalne!',
			okText: 'Tak',
			okType: 'primary',
			cancelText: 'Nie',
			onOk() {
				dispatch(updatePayment({
					id: paymentToFinish.id,
					title: paymentToFinish.title,
					description: paymentToFinish.description,
					amount: paymentToFinish.amount,
					dueDate: paymentToFinish.dueDate,
					isPaid: true,
					recipientAccountNumber: paymentToFinish.recipientAccountNumber
				},
				handleSuccess,
				handleError));
			}
		});
	};
}

export function confirmPaymentDelete(paymentId: number, payments: getFlatPaymentsResponse[], dispatch: Dispatch<any>) {
	const { confirm } = Modal;

	return () => {
		const paymentToDelete = payments.find((f) => f.id === paymentId);
		confirm({
			title: `Czy na pewno chcesz usunąć płatność ${paymentToDelete?.description} ?`,
			icon: <ExclamationCircleOutlined />,
			content: 'Wykonanie tej akcji będzie nieodwracalne!',
			okText: 'Tak',
			okType: 'primary',
			cancelText: 'Nie',
			onOk() {
				dispatch(deletePayment(paymentToDelete.id));
			}
		});
	};
}
