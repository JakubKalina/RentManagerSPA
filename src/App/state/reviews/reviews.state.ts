import StatusType from "App/types/requestStatus";
import { ReviewForGetUserReviewsResponse, GetUserReviewsResponse } from "App/api/endpoints/review/responses/getUserReviewsResponse";
import defaultPageQueryParams from "App/common/utils/defaultPageQueryParams";

const { INITIAL } = StatusType;

export interface ReviewsState {
    status: {
        createLandlordReview: StatusType;
        createTenantReview: StatusType;
        getReviews: StatusType;
    };
    error: string[];
    reviews: ReviewForGetUserReviewsResponse[];
    selectedReview: ReviewForGetUserReviewsResponse;
}

export const ReviewsInitialState: ReviewsState = {
    status: {
        createLandlordReview: INITIAL,
        createTenantReview: INITIAL,
        getReviews: INITIAL
    },
    error: null,
    reviews: [],
    selectedReview: null
}