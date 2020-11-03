import { GetFlatsResponse } from './responses/getFlatsResponse';
import { GetFlatsRequest } from './requests/getFlatsRequest';
import { UpdateFlatRequest } from './requests/updateFlatRequest';
import { CreateFlatRequest } from './requests/createFlatRequest';
import { requests } from './../../agent/agent';
import { HttpStatusCodeResponse } from 'App/types/httpResponse.d';
import { GetFlatResponse } from './responses/getFlatResponse';

export const FlatApi = {
    getFlat: (flatId: number): Promise<GetFlatResponse> =>
    requests.get(`/flat/${flatId}`),

    createFlat: (body: CreateFlatRequest): Promise<HttpStatusCodeResponse> => 
    requests.post(`/flat`, body),

    updateFlat: (body: UpdateFlatRequest): Promise<HttpStatusCodeResponse> =>
    requests.put(`/flat`, body),
    
    getFlats: (params: GetFlatsRequest) : Promise<GetFlatsResponse> => 
    requests.get(`/flat`, params),

    deleteFlat: (flatId: number): Promise<HttpStatusCodeResponse> =>
    requests.delete(`/flat/${flatId}`)
}