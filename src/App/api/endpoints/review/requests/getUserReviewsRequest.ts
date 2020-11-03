import { IPageQueryParams } from 'App/types/pagination/pagination';
export interface GetUserReviewsRequest extends IPageQueryParams {
    userId: string;
}