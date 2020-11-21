import { GetFlatReportsResponse } from './../../../api/endpoints/report/responses/getFlatReportsResponse';
import { GetReportsResponse } from './../../../api/endpoints/report/responses/getReportsResponse';
import { landlordReportsInitialState, LandlordReportsState } from './reports.state';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import StatusType from "App/types/requestStatus";

const { FAILED, LOADING, SUCCESS } = StatusType;

export const landlordReportsSlice = createSlice({
    name: 'landlord-reports',
    initialState: landlordReportsInitialState,
    reducers: {

        getReportsStart: (state: LandlordReportsState) => {
            state.error = null;
            state.status.getReports = LOADING;
            state.reports = [];
        },
        getReportsSuccess: (state: LandlordReportsState, action: PayloadAction<GetReportsResponse>) => {
            state.status.getReports = SUCCESS;
            state.reports = action.payload.data;
            state.getReportsParams = action.payload;
        },
        getReportsFailure: (state: LandlordReportsState, action: PayloadAction<string[]>) => {
            state.status.getReports = FAILED;
            state.error = action.payload;
        },


        getFlatReportsStart: (state: LandlordReportsState) => {
            state.error = null;
            state.status.getFlatReports = LOADING;
            state.flatReports = [];
        },
        getFlatReportsSuccess: (state: LandlordReportsState, action: PayloadAction<GetFlatReportsResponse>) => {
            state.status.getFlatReports = SUCCESS;
            state.flatReports = action.payload.data;
            state.getFlatReportsParams = action.payload;
        },
        getFlatReportsFailure: (state: LandlordReportsState, action: PayloadAction<string[]>) => {
            state.status.getFlatReports = FAILED;
            state.error = action.payload;
        },


        createLandlordReportStart: (state: LandlordReportsState) => {
            state.error = null;
            state.status.createLandlordReport = LOADING;
        },
        createLandlordReportSuccess:(state: LandlordReportsState) => {
            state.status.createLandlordReport = SUCCESS;
        },
        createLandlordReportFailure:(state: LandlordReportsState, action: PayloadAction<string[]>) => {
            state.status.createLandlordReport = FAILED;
            state.error = action.payload;
        },


        deleteReportStart: (state: LandlordReportsState) => {
            state.status.deleteReport = LOADING;
            state.error = null;
        },
        deleteReportSuccess: (state: LandlordReportsState, action: PayloadAction<number>) => {
            state.status.deleteReport = SUCCESS;
            state.flatReports = state.flatReports.filter((f) => f.id !== action.payload);
            state.reports = state.reports.filter((f) => f.id !== action.payload);
        },
        deleteReportFailure: (state: LandlordReportsState, action: PayloadAction<string[]>) => {
            state.status.deleteReport = FAILED;
            state.error = action.payload;
        }

    }
});


export const {

    getReportsStart,
    getReportsSuccess,
    getReportsFailure,

    getFlatReportsStart,
    getFlatReportsSuccess,
    getFlatReportsFailure,

    createLandlordReportStart,
    createLandlordReportSuccess,
    createLandlordReportFailure,

    deleteReportStart,
    deleteReportSuccess,
    deleteReportFailure

} = landlordReportsSlice.actions;