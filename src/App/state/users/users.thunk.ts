import { AppThunk } from 'App/state/store';
import { GetUsersRequest } from "App/api/endpoints/account/requests/getUsersRequest";
import { getUsersStart, getUsersSuccess, getUsersFailure } from './users.slice';
import agent from 'App/api/agent/agent';


export const getUsers = (params: GetUsersRequest): AppThunk => async (dispatch) => {
    dispatch(getUsersStart());
    agent.Account.getUsers(params)
        .then((response) => dispatch(getUsersSuccess(response)))
        .catch((error) => dispatch(getUsersFailure(error)));

};