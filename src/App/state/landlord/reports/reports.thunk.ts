import { GetFlatReportsRequest } from './../../../api/endpoints/report/requests/getFlatReportsRequest';
import { AppThunk } from 'App/state/store';
import { GetReportsRequest } from './../../../api/endpoints/report/requests/getReportsRequest';
import { CreateLandlordReviewRequest } from 'App/api/endpoints/review/requests/createLandlordReviewRequest';
import { getReportsStart, getReportsSuccess, getReportsFailure, getFlatReportsStart, getFlatReportsSuccess, getFlatReportsFailure, createLandlordReportStart, deleteReportStart, deleteReportFailure, deleteReportSuccess, createLandlordReportSuccess, createLandlordReportFailure } from './reports.slice';
import agent from 'App/api/agent/agent';
import { CreateLandlordReportRequest } from 'App/api/endpoints/report/requests/createlLandlordReportRequest';


export const getReports = (params: GetReportsRequest): AppThunk => async (dispatch) => {
    dispatch(getReportsStart());
    agent.Report.getReports(params)
        .then((response) => dispatch(getReportsSuccess(response)))
        .catch((error) => dispatch(getReportsFailure(error)));
};

export const getFlatReports = (params: GetFlatReportsRequest): AppThunk => async (dispatch) => {
    dispatch(getFlatReportsStart());
    agent.Report.getFlatReports(params)
        .then((response) => dispatch(getFlatReportsSuccess(response)))
        .catch((error) => dispatch(getFlatReportsFailure(error)));
};

export const createLandlordReport = (reportToCreate: CreateLandlordReportRequest, onSuccess?: () => void, onError?: (error: string[]) => void): AppThunk => async (dispatch) => {
    dispatch(createLandlordReportStart());
    agent.Report.createLandlordReport(reportToCreate)
        .then((response) => {
            dispatch(createLandlordReportSuccess());
            onSuccess();
        })
        .catch((error) => {
            const err = ['Wprowadzono niepoprawne dane'];
			onError(err);
            dispatch(createLandlordReportFailure(error))
        });
};

export const deleteReport = (reportId: number):AppThunk => async (dispatch) => {
    dispatch(deleteReportStart());
    agent.Report.deleteReport(reportId)
        .then(() => dispatch(deleteReportSuccess(reportId)))
        .catch((error) => dispatch(deleteReportFailure(error)));
};