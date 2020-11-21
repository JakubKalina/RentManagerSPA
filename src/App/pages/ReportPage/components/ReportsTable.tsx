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
import { ReportForGetReportsResponse } from 'App/api/endpoints/report/responses/getReportsResponse';

export const renderReportsTableColumns = (reports: ReportForGetReportsResponse[], dispatch: Dispatch<any>) => [
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
		render: (record: ReportForGetReportsResponse) => (
			<>
                {record.senderFirstName} {record.senderLastName}
			</>
		)
	},
    {
        title: 'Mieszkanie',
        dataIndex: 'flatDescription'
    },
    {
        title: 'Treść',
        dataIndex: 'description'
    }

];
