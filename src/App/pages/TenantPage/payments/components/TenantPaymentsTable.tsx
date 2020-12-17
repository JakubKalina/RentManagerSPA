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
import { getTenantPaymentsResponse } from 'App/api/endpoints/payment/responses/getTenantPaymentsResponse';

export const renderTenantPaymentsTableColumns = (payments: getTenantPaymentsResponse[]) => [
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
        title: 'Na konto',
        dataIndex: 'recipientAccountNumber'
    },

];


