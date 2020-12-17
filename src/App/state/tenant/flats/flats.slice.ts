import { GetFlatResponse } from './../../../api/endpoints/flat/responses/getFlatResponse';
import { GetLandlordFlatsResponse } from './../../../api/endpoints/flat/responses/getLandlordFlatsResponse';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import StatusType from 'App/types/requestStatus';
import { act } from '@testing-library/react';
import { tenantFlatsInitialState, TenantFlatsState } from './flats.state';
import { GetTenantFlatsResponse } from 'App/api/endpoints/flat/responses/getTenantFlatsResponse';

const { FAILED, LOADING, SUCCESS } = StatusType;

export const tenantFlatsSlice = createSlice({
    name: 'tenant-flats',
    initialState: tenantFlatsInitialState,
    reducers: {

        getFlatsStart: (state: TenantFlatsState) => {
            state.status.getFlats = LOADING;
            state.error = null;
            state.flats = [];
        },
        getFlatsSuccess: (state: TenantFlatsState, action: PayloadAction<GetTenantFlatsResponse>) => {
            state.status.getFlats = SUCCESS;
            state.flats = action.payload.data;
            state.getFlatsParams = action.payload;
        },
        getFlatsFailure: (state: TenantFlatsState, action: PayloadAction<string[]>) => {
            state.status.getFlats = FAILED;
            state.error = action.payload;
        }

    }
});

export const {
    getFlatsStart,
    getFlatsSuccess,
    getFlatsFailure,

} = tenantFlatsSlice.actions;
