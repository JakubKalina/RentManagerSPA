import { GetFlatReportsRequest } from './../../../api/endpoints/report/requests/getFlatReportsRequest';
import { GetReportsRequest } from './../../../api/endpoints/report/requests/getReportsRequest';
import { ReportForGetFlatReportsResponse } from './../../../api/endpoints/report/responses/getFlatReportsResponse';
import { ReportForGetReportsResponse } from './../../../api/endpoints/report/responses/getReportsResponse';
import StatusType from "App/types/requestStatus";
import defaultPageQueryParams from 'App/common/utils/defaultPageQueryParams';

const { INITIAL } = StatusType;

export interface LandlordReportsState{
    status: {
        getReports: StatusType;
        getFlatReports: StatusType;
        createLandlordReport: StatusType;
        deleteReport: StatusType;
    };
    error: string[];
    reports: ReportForGetReportsResponse[];
    flatReports: ReportForGetFlatReportsResponse[];
    getReportsParams: GetReportsRequest;
    getFlatReportsParams: GetFlatReportsRequest;
    getReportsTotalPages: number;
    getFlatReportsTotalPages: number;
}

export const landlordReportsInitialState: LandlordReportsState = {
    status: {
        getReports: INITIAL,
        getFlatReports: INITIAL,
        createLandlordReport: INITIAL,
        deleteReport: INITIAL
    },
    error: null,
    reports: [],
    flatReports: [],
    getReportsParams: defaultPageQueryParams,
    getFlatReportsParams: null,
    getReportsTotalPages: 0,
    getFlatReportsTotalPages: 0
}