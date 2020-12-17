import { UpdateFlatRequest } from './../../../api/endpoints/flat/requests/updateFlatRequest';
import { CreateFlatRequest } from './../../../api/endpoints/flat/requests/createFlatRequest';
import { AppThunk } from 'App/state/store';
import { GetLandlordFlatsRequest } from "App/api/endpoints/flat/requests/getLandlordFlatsRequest";
import agent from 'App/api/agent/agent';
import { getFlatsStart, getFlatsSuccess, getFlatsFailure } from './flats.slice';
import { GetAdminFlatsRequest } from 'App/api/endpoints/flat/requests/getAdminFlatsRequest';

export const getFlats = (params: GetAdminFlatsRequest): AppThunk => async (dispatch) => {
    dispatch(getFlatsStart());
    agent.Flat.getAdminFlats(params)
        .then((response) => dispatch(getFlatsSuccess(response)))
        .catch((error) => dispatch(getFlatsFailure(error)));
};

