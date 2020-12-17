import { updatePaymentRequest } from './../../../api/endpoints/payment/requests/updatePaymentRequest';
import { getFlatPaymentsResponse } from './../../../api/endpoints/payment/responses/getFlatPaymentsResponse';
import { tenantPaymentsInitialState, TenantPaymentsState } from './payments.state';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import StatusType from 'App/types/requestStatus';
import { getTenantPaymentsResponse } from 'App/api/endpoints/payment/responses/getTenantPaymentsResponse';
const { FAILED, LOADING, SUCCESS } = StatusType;

export const tenantPaymentsSlice = createSlice({
    name: 'tenant-payments',
    initialState: tenantPaymentsInitialState,
    reducers: {

        getTenantPaymentsStart: (state: TenantPaymentsState) => {
            state.status.getTenantPayments = LOADING;
            state.error = null;
            state.tenantPayments = [];
        },
        getTenantPaymentsSuccess: (state: TenantPaymentsState, action: PayloadAction<getTenantPaymentsResponse[]>) => {
            state.status.getTenantPayments = SUCCESS;
            state.tenantPayments = action.payload;
        },
        getTenantPaymentsFailure: (state: TenantPaymentsState, action: PayloadAction<string[]>) => {
            state.status.getTenantPayments = FAILED;
            state.error = action.payload;
        },

    }
});

export const {
    getTenantPaymentsStart,
    getTenantPaymentsSuccess,
    getTenantPaymentsFailure,

} = tenantPaymentsSlice.actions;