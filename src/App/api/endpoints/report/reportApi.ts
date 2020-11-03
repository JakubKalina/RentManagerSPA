import { UpdateReportRequest } from './requests/updateReportRequest';
import { HttpStatusCodeResponse } from 'App/types/httpResponse.d';
import { CreateReportRequest } from './requests/createReportRequest';
import { requests } from './../../agent/agent';
import { GetReportsResponse } from './responses/getReportsResponse';
import { GetReportsRequest } from './requests/getReportsRequest';
export const ReportApi = {
    getReports: (params: GetReportsRequest): Promise<GetReportsResponse> =>
    requests.get(`/report`, params),

    createReport: (body: CreateReportRequest): Promise<HttpStatusCodeResponse> =>
    requests.post(`/report`, body),

    updateReport: (body: UpdateReportRequest): Promise<HttpStatusCodeResponse> =>
    requests.put(`/report`, body),

    deleteReport: (reportId: number): Promise<HttpStatusCodeResponse> =>
    requests.delete(`/report/${reportId}`)
}