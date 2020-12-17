import { updatePaymentRequest } from './../../../api/endpoints/payment/requests/updatePaymentRequest';
import { createPaymentRequest } from './../../../api/endpoints/payment/requests/createPaymentRequest';
import { AppThunk } from 'App/state/store';
import agent from 'App/api/agent/agent';
import { getTenantPaymentsStart, getTenantPaymentsSuccess, getTenantPaymentsFailure } from './payments.slice';


export const getTenantPayments = (): AppThunk => async (dispatch) => {
    dispatch(getTenantPaymentsStart());
    agent.Payment.getTenantPayments()
        .then((response) => {
            dispatch(getTenantPaymentsSuccess(response));
        })
        .catch((error) => {
            dispatch(getTenantPaymentsFailure(error));
        });
};

