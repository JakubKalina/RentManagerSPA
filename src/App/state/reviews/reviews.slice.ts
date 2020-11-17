import { ReviewsInitialState, ReviewsState } from './reviews.state';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import StatusType from 'App/types/requestStatus';
import { GetUserReviewsResponse } from 'App/api/endpoints/review/responses/getUserReviewsResponse';

const { FAILED, LOADING, SUCCESS } = StatusType;

export const reviewsSlice = createSlice({
    name: 'reviews',
    initialState: ReviewsInitialState,
    reducers: {

        getReviewsStart: (state: ReviewsState) => {
            state.status.getReviews = LOADING;
            state.error = null;
            state.reviews = [];
        },
        getReviewsSucces: (state: ReviewsState, action: PayloadAction<GetUserReviewsResponse>) => {
            state.status.getReviews = SUCCESS;
            state.reviews = action.payload.data;
        },
        getReviewsFailure: (state: ReviewsState, action: PayloadAction<string[]>) => {
            state.status.getReviews = FAILED;
            state.error = action.payload;
        },



        createLandlordReviewStart: (state: ReviewsState) => {
            state.status.createLandlordReview = LOADING;
            state.error = null;
        },
        createLandlordReviewSuccess: (state: ReviewsState) => {
            state.status.createLandlordReview = SUCCESS;
        },
        createLandlordReviewFailure: (state: ReviewsState, action: PayloadAction<string[]>) => {
            state.status.createLandlordReview = FAILED;
            state.error = action.payload;
        },



        createTenantReviewStart: (state: ReviewsState) => {
            state.status.createTenantReview = LOADING;
            state.error = null;
        },
        createTenantReviewSuccess: (state: ReviewsState) => {
            state.status.createTenantReview = SUCCESS;
        },
        createTenantReviewFailure: (state: ReviewsState, action: PayloadAction<string[]>) => {
            state.status.createTenantReview = FAILED;
            state.error = action.payload;
        }
        
    }
})

export const {
    getReviewsStart,
    getReviewsSucces,
    getReviewsFailure,

    createLandlordReviewStart,
    createLandlordReviewSuccess,
    createLandlordReviewFailure,

    createTenantReviewStart,
    createTenantReviewSuccess,
    createTenantReviewFailure

} = reviewsSlice.actions;