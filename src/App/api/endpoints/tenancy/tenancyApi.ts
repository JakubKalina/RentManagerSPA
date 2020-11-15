import { UpdateTenancyRequest } from './requests/updateTenancyRequest';
import { HttpStatusCodeResponse } from 'App/types/httpResponse.d';
import { BeginTenancyRequest } from './requests/beginTenancyRequest';
import { GetUserTenanciesResponse } from './responses/getUserTenanciesResponse';
import { requests } from './../../agent/agent';
import { GetFlatTenanciesResponse } from './responses/getFlatTenanciesResponse';
export const TenancyApi = {
    getFlatTenancies: (flatId: number): Promise<GetFlatTenanciesResponse[]> =>
    requests.get(`/tenancy/flat/${flatId}`),

    getUserTenancies: (): Promise<GetUserTenanciesResponse> =>
    requests.get(`/tenancy/user`),

    beginTenancy: (body: BeginTenancyRequest): Promise<HttpStatusCodeResponse> =>
    requests.post(`/tenancy`, body),

    updateTenancy: (body: UpdateTenancyRequest): Promise<HttpStatusCodeResponse> =>
    requests.put(`/tenancy`, body)
}