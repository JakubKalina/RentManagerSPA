import StatusType from "App/types/requestStatus";
import { getTenantPaymentsResponse } from 'App/api/endpoints/payment/responses/getTenantPaymentsResponse';

const { INITIAL } = StatusType;

export interface TenantPaymentsState {
    status: {
        getTenantPayments: StatusType;
    },
    error: string[];
    tenantPayments: getTenantPaymentsResponse[];
}

export const tenantPaymentsInitialState: TenantPaymentsState = {
    status: {
        getTenantPayments: INITIAL,
    },
    error: null,
    tenantPayments: []
}