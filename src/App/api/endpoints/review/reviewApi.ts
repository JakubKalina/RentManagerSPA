import { HttpStatusCodeResponse } from 'App/types/httpResponse.d';
import { CreateUserReviewRequest } from './requests/createUserReviewRequest';
import { requests } from './../../agent/agent';
import { GetUserReviewsResponse } from './responses/getUserReviewsResponse';
import { GetUserReviewsRequest } from './requests/getUserReviewsRequest';
export const ReviewApi = {
    getUserReviews: (params: GetUserReviewsRequest): Promise<GetUserReviewsResponse> =>
    requests.get(`/review`, params),

    createUserReview: (body: CreateUserReviewRequest): Promise<HttpStatusCodeResponse> =>
    requests.post(`/review`, body)
}