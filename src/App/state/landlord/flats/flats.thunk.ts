import { UpdateFlatRequest } from './../../../api/endpoints/flat/requests/updateFlatRequest';
import { CreateFlatRequest } from './../../../api/endpoints/flat/requests/createFlatRequest';
import { AppThunk } from 'App/state/store';
import { GetLandlordFlatsRequest } from "App/api/endpoints/flat/requests/getLandlordFlatsRequest";
import { getFlatsStart, getFlatsSuccess, getFlatsFailure, createFlatStart, createFlatSuccess, createFlatFailure, updateFlatStart, updateFlatSuccess, updateFlatFailure, deleteFlatStart, deleteFlatSuccess, deleteFlatFailure, getFlatStart, getFlatSuccess, getFlatFailure } from './flats.slice';
import agent from 'App/api/agent/agent';

export const getFlats = (params: GetLandlordFlatsRequest): AppThunk => async (dispatch) => {
    dispatch(getFlatsStart());
    agent.Flat.getLandlordFlats(params)
        .then((response) => dispatch(getFlatsSuccess(response)))
        .catch((error) => dispatch(getFlatsFailure(error)));
};

export const getFlat = (flatId: number, onSuccess?: () => void, onError?: (error: string[]) => void): AppThunk => async (dispatch) => {
    dispatch(getFlatStart());
    agent.Flat.getFlat(flatId)
        .then((response) => {
            dispatch(getFlatSuccess(response));
            onSuccess();
        })
        .catch((error) => {
            const err = ['Nie udało sie pobrać mieszkania'];
			onError(err);
            dispatch(getFlatFailure(error));
        })
};

export const createFlat = (flatToCreate: CreateFlatRequest, onSuccess?: () => void, onError?: (error: string[]) => void): AppThunk => async (dispatch) => {
    dispatch(createFlatStart());
    agent.Flat.createFlat(flatToCreate)
        .then(() => {
            dispatch(createFlatSuccess());
            onSuccess();
        })
        .catch((error) => {
            const err = ['Wprowadzono niepoprawne dane'];
			onError(err);
            dispatch(createFlatFailure(error));
        });
};

export const updateFlat = (flatToUpdate: UpdateFlatRequest, onSuccess?: () => void, onError?: (error: string[]) => void): AppThunk => async (dispatch) => {
    dispatch(updateFlatStart());
    agent.Flat.updateFlat(flatToUpdate)
        .then(() => { 
            dispatch(updateFlatSuccess())
            onSuccess();
        })
        .catch((error) => {
            const err = ['Wprowadzono niepoprawne dane'];
			onError(err);
            dispatch(updateFlatFailure(error))
        });
};
export const deleteFlat = (flatId: number): AppThunk => async (dispatch) => {
    dispatch(deleteFlatStart());
    agent.Flat.deleteFlat(flatId)
        .then(() => dispatch(deleteFlatSuccess(flatId)))
        .catch((error) => dispatch(deleteFlatFailure(error)));
};  