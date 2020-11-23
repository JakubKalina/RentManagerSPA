import { updatePaymentRequest } from './../../../api/endpoints/payment/requests/updatePaymentRequest';
import { createPaymentRequest } from './../../../api/endpoints/payment/requests/createPaymentRequest';
import { getFlatPaymentsResponse } from './../../../api/endpoints/payment/responses/getFlatPaymentsResponse';
import StatusType from "App/types/requestStatus";

const { INITIAL } = StatusType;

export interface LandlordPaymentsState {
    status: {
        getFlatPayments: StatusType;
        createPayment: StatusType;
        updatePayment: StatusType;
        deletePayment: StatusType;
    },
    error: string[];
    flatPayments: getFlatPaymentsResponse[];
}

export const landlordPaymentsInitialState: LandlordPaymentsState = {
    status: {
        getFlatPayments: INITIAL,
        createPayment: INITIAL,
        updatePayment: INITIAL,
        deletePayment: INITIAL
    },
    error: null,
    flatPayments: []
}