import { GetLandlordFlatsResponse } from './responses/getLandlordFlatsResponse';
import { GetLandlordFlatsRequest } from './requests/getLandlordFlatsRequest';
import { UpdateFlatRequest } from './requests/updateFlatRequest';
import { CreateFlatRequest } from './requests/createFlatRequest';
import { requests } from './../../agent/agent';
import { HttpStatusCodeResponse } from 'App/types/httpResponse.d';
import { GetFlatResponse } from './responses/getFlatResponse';
import { GetTenantFlatsRequest } from './requests/getTenantFlatsRequest';
import { GetTenantFlatsResponse } from './responses/getTenantFlatsResponse';
import { GetAdminFlatsResponse } from './responses/getAdminFlatsResponse';
import { GetAdminFlatsRequest } from './requests/getAdminFlatsRequest';

export const FlatApi = {
    getFlat: (flatId: number): Promise<GetFlatResponse> =>
    requests.get(`/flat/${flatId}`),

    createFlat: (body: CreateFlatRequest): Promise<HttpStatusCodeResponse> => 
    requests.post(`/flat`, body),

    updateFlat: (body: UpdateFlatRequest): Promise<HttpStatusCodeResponse> =>
    requests.put(`/flat`, body),
    
    getLandlordFlats: (params: GetLandlordFlatsRequest) : Promise<GetLandlordFlatsResponse> => 
    requests.get(`/flat/landlord`, params),

    getAdminFlats: (params: GetAdminFlatsRequest) : Promise<GetAdminFlatsResponse> => 
    requests.get(`/flat/admin`, params),

    getTenantFlats: (params: GetTenantFlatsRequest) : Promise<GetTenantFlatsResponse> => 
    requests.get(`/flat/tenant`, params),

    deleteFlat: (flatId: number): Promise<HttpStatusCodeResponse> =>
    requests.delete(`/flat/${flatId}`)
}