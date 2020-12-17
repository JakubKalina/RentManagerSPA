import { GetFlatResponse } from './../../../api/endpoints/flat/responses/getFlatResponse';
import { GetLandlordFlatsResponse } from './../../../api/endpoints/flat/responses/getLandlordFlatsResponse';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import StatusType from 'App/types/requestStatus';
import { act } from '@testing-library/react';
import { adminFlatsInitialState, AdminFlatsState } from './flats.state';
import { GetAdminFlatsResponse } from 'App/api/endpoints/flat/responses/getAdminFlatsResponse';

const { FAILED, LOADING, SUCCESS } = StatusType;

export const adminFlatsSlice = createSlice({
    name: 'landlord-flats',
    initialState: adminFlatsInitialState,
    reducers: {

        getFlatsStart: (state: AdminFlatsState) => {
            state.status.getFlats = LOADING;
            state.error = null;
            state.flats = [];
        },
        getFlatsSuccess: (state: AdminFlatsState, action: PayloadAction<GetAdminFlatsResponse>) => {
            state.status.getFlats = SUCCESS;
            state.flats = action.payload.data;
            state.getFlatsParams = action.payload;
        },
        getFlatsFailure: (state: AdminFlatsState, action: PayloadAction<string[]>) => {
            state.status.getFlats = FAILED;
            state.error = action.payload;
        }


    }
}
);

export const {
    getFlatsStart,
    getFlatsSuccess,
    getFlatsFailure,

} = adminFlatsSlice.actions;
