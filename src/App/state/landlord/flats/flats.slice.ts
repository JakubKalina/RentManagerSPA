import { GetLandlordFlatsResponse } from './../../../api/endpoints/flat/responses/getLandlordFlatsResponse';
import { landlordFlatsInitialState, LandlordFlatsState } from './flats.state';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import StatusType from 'App/types/requestStatus';
import { act } from '@testing-library/react';

const { FAILED, LOADING, SUCCESS } = StatusType;

export const landlordFlatsSlice = createSlice({
    name: 'landlord-flats',
    initialState: landlordFlatsInitialState,
    reducers: {

        getFlatsStart: (state: LandlordFlatsState) => {
            state.status.getFlats = LOADING;
            state.error = null;
            state.flats = [];
        },
        getFlatsSuccess: (state: LandlordFlatsState, action: PayloadAction<GetLandlordFlatsResponse>) => {
            state.status.getFlats = SUCCESS;
            state.flats = action.payload.data;
            state.getFlatsParams = action.payload;
        },
        getFlatsFailure: (state: LandlordFlatsState, action: PayloadAction<string[]>) => {
            state.status.getFlats = FAILED;
            state.error = action.payload;
        },

        createFlatStart: (state: LandlordFlatsState) => {
            state.error = null;
            state.status.createFlat = LOADING;
        },
        createFlatSuccess: (state: LandlordFlatsState) => {
            state.status.createFlat = SUCCESS;
        },
        createFlatFailure: (state: LandlordFlatsState, action: PayloadAction<string[]>) => {
            state.status.createFlat = FAILED;
            state.error = action.payload;
        },

        updateFlatStart: (state: LandlordFlatsState) => {
            state.status.updateFlat = LOADING;
            state.error = null;
        },
        updateFlatSuccess: (state: LandlordFlatsState) => {
            state.status.updateFlat = SUCCESS;
        },
        updateFlatFailure: (state: LandlordFlatsState, action: PayloadAction<string[]>) => {
            state.status.updateFlat = FAILED;
            state.error = action.payload;
        },

        deleteFlatStart: (state: LandlordFlatsState) => {
            state.status.deleteFlat = LOADING;
            state.error = null;
        },
        deleteFlatSuccess: (state: LandlordFlatsState, action: PayloadAction<number>) => {
            state.status.deleteFlat = SUCCESS;
            state.flats = state.flats.filter((f) => f.id !== action.payload);
        },
        deleteFlatFailure: (state: LandlordFlatsState, action: PayloadAction<string[]>) => {
            state.status.deleteFlat = FAILED;
            state.error = action.payload;
        },

        // Cleanup
        cleanUpFlatStatus: (state: LandlordFlatsState) => {
            state.status = landlordFlatsInitialState.status;
            state.error = landlordFlatsInitialState.error;
        },
    }
});

export const {
    getFlatsStart,
    getFlatsSuccess,
    getFlatsFailure,

    createFlatStart,
    createFlatSuccess,
    createFlatFailure,

    updateFlatStart,
    updateFlatSuccess,
    updateFlatFailure,

    deleteFlatStart,
    deleteFlatSuccess,
    deleteFlatFailure,

    cleanUpFlatStatus
} = landlordFlatsSlice.actions;
