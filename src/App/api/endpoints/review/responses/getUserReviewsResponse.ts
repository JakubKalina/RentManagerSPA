import { ICollectionResponse } from 'App/types/pagination/pagination';
export interface GetUserReviewsResponse extends ICollectionResponse<ReviewForGetUserReviewsResponse> {}

export interface ReviewForGetUserReviewsResponse {
    rate: number;
    description: string;
}