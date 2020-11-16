import { GetFlatTenanciesResponse } from './../../../api/endpoints/tenancy/responses/getFlatTenanciesResponse';
import { landlordTenanciesInitialState, LandlordTenanciesState } from './tenancies.state';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import StatusType from 'App/types/requestStatus';

const { FAILED, LOADING, SUCCESS } = StatusType;

export const landlordTenanciesSlice = createSlice({
    name: 'landlord-tenancies',
    initialState: landlordTenanciesInitialState,
    reducers: {

        getTenanciesStart: (state: LandlordTenanciesState) => {
            state.status.getTenancies = LOADING;
            state.error = null;
            state.tenancies = [];
        },
        getTenanciesSuccess: (state: LandlordTenanciesState, action: PayloadAction<GetFlatTenanciesResponse[]>) => {
            state.status.getTenancies = SUCCESS;
            state.tenancies = action.payload;

        },
        getTenanciesFailure: (state: LandlordTenanciesState, action: PayloadAction<string[]>) => {
            state.status.getTenancies = FAILED;
            state.error = action.payload;
        },

        
        getTenancyStart: (state: LandlordTenanciesState) => {
            state.status.getTenancy = LOADING;
            state.error = null;
            state.tenancy = null;
        },
        getTenancySuccess: (state: LandlordTenanciesState, action: PayloadAction<GetFlatTenanciesResponse>) => {
            state.status.getTenancy = SUCCESS;
            state.tenancy = action.payload;
        },
        getTenancyFailure: (state: LandlordTenanciesState, action: PayloadAction<string[]>) => {
            state.status.getTenancy = FAILED;
            state.error = action.payload;
        },


        beginTenancyStart: (state: LandlordTenanciesState) => {
            state.status.beginTenancy = LOADING;
            state.error = null;
        },
        beginTenancySuccess: (state: LandlordTenanciesState) => {
            state.status.beginTenancy = SUCCESS;
        },
        beginTenancyFailure: (state: LandlordTenanciesState, action: PayloadAction<string[]>) => {
            state.status.beginTenancy = FAILED;
            state.error = action.payload;
        },


        updateTenancyStart: (state: LandlordTenanciesState) => {
            state.status.updateTenancy = LOADING;
            state.error = null;
        },
        updateTenancySuccess: (state: LandlordTenanciesState) => {
            state.status.updateTenancy = SUCCESS;
        },
        updateTenancyFailure: (state: LandlordTenanciesState, action: PayloadAction<string[]>) => {
            state.status.updateTenancy = FAILED;
            state.error = action.payload;
        },


        cleanUpTenancyStatus: (state: LandlordTenanciesState) => {
            state.status = landlordTenanciesInitialState.status;
            state.error = landlordTenanciesInitialState.error;
        }

    }

});

export const {

    getTenanciesStart,
    getTenanciesSuccess,
    getTenanciesFailure,

    getTenancyStart,
    getTenancySuccess,
    getTenancyFailure,

    beginTenancyStart,
    beginTenancySuccess,
    beginTenancyFailure,

    updateTenancyStart,
    updateTenancySuccess,
    updateTenancyFailure,

    cleanUpTenancyStatus

} = landlordTenanciesSlice.actions;