import { updatePaymentRequest } from './../../../api/endpoints/payment/requests/updatePaymentRequest';
import { createPaymentRequest } from './../../../api/endpoints/payment/requests/createPaymentRequest';
import { AppThunk } from 'App/state/store';
import { getFlatPaymentsStart, getFlatPaymentsSuccess, getFlatPaymentsFailure, createPaymentStart, createPaymentSuccess, createPaymentFailure, updatePaymentStart, updatePaymentSuccess, updatePaymentFailure, deletePaymentStart, deletePaymentSuccess, deletePaymentFailure } from './payments.slice';
import agent from 'App/api/agent/agent';


export const getFlatPayments = (flatId: number): AppThunk => async (dispatch) => {
    dispatch(getFlatPaymentsStart());
    agent.Payment.getFlatPayments(flatId)
        .then((response) => {
            dispatch(getFlatPaymentsSuccess(response));
        })
        .catch((error) => {
            dispatch(getFlatPaymentsFailure(error));
        });
};


export const createPayment = (paymentToCreate: createPaymentRequest, onSuccess?: () => void, onError?: (error: string[]) => void): AppThunk => async (dispatch) => {
    dispatch(createPaymentStart());
    agent.Payment.createPayment(paymentToCreate)
        .then(() => {
            dispatch(createPaymentSuccess());
            onSuccess();
        })
        .catch((error) => {
            const err = ['Wprowadzono niepoprawne dane'];
            onError(err);
            dispatch(createPaymentFailure(error));
        });
};


export const updatePayment = (paymentToUpdate: updatePaymentRequest, onSuccess?: () => void, onError?: (error: string[]) => void): AppThunk => async (dispatch) => {
    dispatch(updatePaymentStart());
    agent.Payment.updatePayment(paymentToUpdate)
        .then(() => {
            dispatch(updatePaymentSuccess());
            onSuccess();
        })
        .catch((error) => {
            const err = ['Wprowadzono niepoprawne dane'];
            onError(err);
            dispatch(updatePaymentFailure(error));
        });
};


export const deletePayment = (paymentId: number, onSuccess?: () => void, onError?: (error: string[]) => void): AppThunk => async (dispatch) => {
    dispatch(deletePaymentStart());
    agent.Payment.deletePayment(paymentId)
        .then(() => {
            dispatch(deletePaymentSuccess());
            onSuccess();
        })
        .catch((error) => {
            const err = ['Wprowadzono niepoprawne dane'];
            onError(err);
            dispatch(deletePaymentFailure(error));
        });
}