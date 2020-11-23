import { updatePaymentRequest } from './../../../api/endpoints/payment/requests/updatePaymentRequest';
import { getFlatPaymentsResponse } from './../../../api/endpoints/payment/responses/getFlatPaymentsResponse';
import { landlordPaymentsInitialState, LandlordPaymentsState } from './payments.state';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import StatusType from 'App/types/requestStatus';
const { FAILED, LOADING, SUCCESS } = StatusType;

export const landlordPaymentsSlice = createSlice({
    name: 'landlord-payments',
    initialState: landlordPaymentsInitialState,
    reducers: {

        getFlatPaymentsStart: (state: LandlordPaymentsState) => {
            state.status.getFlatPayments = LOADING;
            state.error = null;
            state.flatPayments = [];
        },
        getFlatPaymentsSuccess: (state: LandlordPaymentsState, action: PayloadAction<getFlatPaymentsResponse[]>) => {
            state.status.getFlatPayments = SUCCESS;
            state.flatPayments = action.payload;
        },
        getFlatPaymentsFailure: (state: LandlordPaymentsState, action: PayloadAction<string[]>) => {
            state.status.getFlatPayments = FAILED;
            state.error = action.payload;
        },


        createPaymentStart: (state: LandlordPaymentsState) => {
            state.status.createPayment = LOADING;
            state.error = null;
        },
        createPaymentSuccess:  (state: LandlordPaymentsState) => {
            state.status.createPayment = SUCCESS;  
        },
        createPaymentFailure: (state: LandlordPaymentsState, action: PayloadAction<string[]>) => {
            state.status.createPayment = FAILED;
            state.error = action.payload;
        },


        updatePaymentStart: (state: LandlordPaymentsState) => {
            state.status.updatePayment = LOADING;
            state.error = null;
        },
        updatePaymentSuccess:  (state: LandlordPaymentsState) => {
            state.status.updatePayment = SUCCESS;
        },
        updatePaymentFailure: (state: LandlordPaymentsState, action: PayloadAction<string[]>) => {
            state.status.updatePayment = FAILED;
            state.error = action.payload;
        },


        deletePaymentStart: (state: LandlordPaymentsState) => {
            state.status.deletePayment = LOADING;
            state.error = null;
        },
        deletePaymentSuccess: (state: LandlordPaymentsState, action: PayloadAction<number>) => {
            state.status.deletePayment = SUCCESS;
            state.flatPayments = state.flatPayments.filter((p) => p.id !== action.payload);
        },
        deletePaymentFailure: (state: LandlordPaymentsState, action: PayloadAction<string[]>) => {
            state.status.deletePayment = FAILED;
            state.error = action.payload;
        }

    }
});

export const {
    getFlatPaymentsStart,
    getFlatPaymentsSuccess,
    getFlatPaymentsFailure,

    createPaymentStart,
    createPaymentSuccess,
    createPaymentFailure,

    updatePaymentStart,
    updatePaymentSuccess,
    updatePaymentFailure,


    deletePaymentStart,
    deletePaymentSuccess,
    deletePaymentFailure

} = landlordPaymentsSlice.actions;