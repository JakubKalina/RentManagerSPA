import { HttpStatusCodeResponse } from 'App/types/httpResponse.d';
import { requests } from './../../agent/agent';
import { GetUserReviewsResponse } from './responses/getUserReviewsResponse';
import { CreateTenantReviewRequest } from './requests/createTenantReviewRequest';
import { CreateLandlordReviewRequest } from './requests/createLandlordReviewRequest';
export const ReviewApi = {


    getUserReviews: (userId: string): Promise<GetUserReviewsResponse> =>
    requests.get(`/review/${userId}`),

    createTenantReview: (body: CreateTenantReviewRequest): Promise<HttpStatusCodeResponse> =>
    requests.post(`/review/landlord`, body),

    createLandlordReview: (body: CreateLandlordReviewRequest): Promise<HttpStatusCodeResponse> =>
    requests.post(`/review/tenant`, body)

}