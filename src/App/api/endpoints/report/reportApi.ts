import { UpdateReportRequest } from './requests/updateReportRequest';
import { HttpStatusCodeResponse } from 'App/types/httpResponse.d';
import { requests } from './../../agent/agent';
import { GetReportsResponse } from './responses/getReportsResponse';
import { GetReportsRequest } from './requests/getReportsRequest';
import { CreateLandlordReportRequest } from './requests/createlLandlordReportRequest';
import { CreateTenantReportRequest } from './requests/createTenantReportRequest';
import { GetFlatReportsRequest } from './requests/getFlatReportsRequest';
import { GetFlatReportsResponse } from './responses/getFlatReportsResponse';
export const ReportApi = {
    
    getReports: (params: GetReportsRequest): Promise<GetReportsResponse> =>
    requests.get(`/report`, params),

    getFlatReports: (params: GetFlatReportsRequest): Promise<GetFlatReportsResponse> =>
    requests.get(`/report/flat`, params),

    createLandlordReport: (body: CreateLandlordReportRequest): Promise<HttpStatusCodeResponse> =>
    requests.post(`/report/landlord`, body),

    createTenantReport: (body: CreateTenantReportRequest): Promise<HttpStatusCodeResponse> =>
    requests.post(`/report/tenant`, body),

    updateReport: (body: UpdateReportRequest): Promise<HttpStatusCodeResponse> =>
    requests.put(`/report`, body),

    deleteReport: (reportId: number): Promise<HttpStatusCodeResponse> =>
    requests.delete(`/report/${reportId}`)
}