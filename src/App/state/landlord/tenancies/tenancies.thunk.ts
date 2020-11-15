import { UpdateTenancyRequest } from './../../../api/endpoints/tenancy/requests/updateTenancyRequest';
import { BeginTenancyRequest } from './../../../api/endpoints/tenancy/requests/beginTenancyRequest';
import { AppThunk } from 'App/state/store';
import { getTenanciesStart, getTenanciesFailure, getTenanciesSuccess, beginTenancySuccess, beginTenancyFailure, beginTenancyStart, updateTenancySuccess, updateTenancyFailure, updateTenancyStart } from './tenancies.slice';
import agent from 'App/api/agent/agent';


export const getTenancies = (flatId: number): AppThunk => async (dispatch) => {
    dispatch(getTenanciesStart());
    agent.Tenancy.getFlatTenancies(flatId)
        .then((response) => {
            dispatch(getTenanciesSuccess(response));
        })
        .catch((error) => dispatch(getTenanciesFailure(error)));
};


export const beginTenancy = (tenancyToBegin: BeginTenancyRequest, onSuccess?: () => void, onError?: (error: string[]) => void): AppThunk => async (dispatch) => {
    dispatch(beginTenancyStart());
    agent.Tenancy.beginTenancy(tenancyToBegin)
        .then(() => {
            dispatch(beginTenancySuccess());
            onSuccess();
        })
        .catch((error) => {
            const err = ['Wprowadzono niepoprawne dane'];
            onError(err);
            dispatch(beginTenancyFailure(error));
        })
};


export const updateTenancy = (tenancyToUpdate: UpdateTenancyRequest, onSuccess?: () => void, onError?: (error: string[]) => void): AppThunk => async (dispatch) => {
    dispatch(updateTenancyStart());
    agent.Tenancy.updateTenancy(tenancyToUpdate)
        .then(() => {
            dispatch(updateTenancySuccess());
            onSuccess();
        })
        .catch((error) => {
            const err = ['Wprowadzono niepoprawne dane'];
            onError(err);
            dispatch(updateTenancyFailure(error));
        })
}