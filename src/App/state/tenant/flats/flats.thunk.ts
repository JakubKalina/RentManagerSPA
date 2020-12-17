import { UpdateFlatRequest } from './../../../api/endpoints/flat/requests/updateFlatRequest';
import { CreateFlatRequest } from './../../../api/endpoints/flat/requests/createFlatRequest';
import { AppThunk } from 'App/state/store';
import { GetLandlordFlatsRequest } from "App/api/endpoints/flat/requests/getLandlordFlatsRequest";
import { getFlatsStart, getFlatsSuccess, getFlatsFailure } from './flats.slice';
import agent from 'App/api/agent/agent';
import { GetTenantFlatsRequest } from 'App/api/endpoints/flat/requests/getTenantFlatsRequest';

export const getFlats = (params: GetTenantFlatsRequest): AppThunk => async (dispatch) => {
    dispatch(getFlatsStart());
    agent.Flat.getTenantFlats(params)
        .then((response) => dispatch(getFlatsSuccess(response)))
        .catch((error) => dispatch(getFlatsFailure(error)));
};

