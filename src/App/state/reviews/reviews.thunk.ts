import { AppThunk } from 'App/state/store';
import { CreateLandlordReviewRequest } from 'App/api/endpoints/review/requests/createLandlordReviewRequest';
import { CreateTenantReviewRequest } from 'App/api/endpoints/review/requests/createTenantReviewRequest';
import { getReviewsStart, getReviewsSucces, getReviewsFailure, createLandlordReviewStart, createLandlordReviewSuccess, createLandlordReviewFailure, createTenantReviewStart, createTenantReviewSuccess, createTenantReviewFailure } from './reviews.slice';
import agent from 'App/api/agent/agent';



export const getUserReviews = (userId: string): AppThunk => async (dispatch) => {
    dispatch(getReviewsStart());
    agent.Review.getUserReviews(userId)
        .then((response) => {
            dispatch(getReviewsSucces(response));
        }
        )
        .catch((error) => {
            dispatch(getReviewsFailure(error));
        })
};

export const createLandlordReview = (reviewToCreate: CreateLandlordReviewRequest, onSuccess?: () => void, onError?: (error: string[]) => void): AppThunk => async (dispatch) => {
    dispatch(createLandlordReviewStart());
    agent.Review.createLandlordReview(reviewToCreate)
        .then(() => {
            dispatch(createLandlordReviewSuccess());
            onSuccess();
        })
        .catch((error) => {
            const err = ['Wprowadzono niepoprawne dane lub opinia już istnieje'];
			onError(err);
            dispatch(createLandlordReviewFailure(error));
        })
};

export const createTenantReview = (reviewToCreate: CreateTenantReviewRequest, onSuccess?: () => void, onError?: (error: string[]) => void): AppThunk => async (dispatch) => {
    dispatch(createTenantReviewStart());
    agent.Review.createTenantReview(reviewToCreate)
        .then(() => {
            dispatch(createTenantReviewSuccess());
            onSuccess();
        })
        .catch((error) => {
            const err = ['Wprowadzono niepoprawne dane lub opinia już istnieje'];
            onError(err);
            dispatch(createTenantReviewFailure(error));
        })
};