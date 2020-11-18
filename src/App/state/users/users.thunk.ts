import { AppThunk } from 'App/state/store';
import { GetUsersRequest } from "App/api/endpoints/account/requests/getUsersRequest";
import { getUsersStart, getUsersSuccess, getUsersFailure, getUserDetailsFailure, getUserDetailsSuccess } from './users.slice';
import agent from 'App/api/agent/agent';
import { getUserDetailsStart } from '../session/session.slice';


export const getUsers = (params: GetUsersRequest): AppThunk => async (dispatch) => {
    dispatch(getUsersStart());
    agent.Account.getUsers(params)
        .then((response) => dispatch(getUsersSuccess(response)))
        .catch((error) => dispatch(getUsersFailure(error)));

};


export const getUserDetails = (userId: string): AppThunk => async (dispatch) => {
    dispatch(getUserDetailsStart());
    agent.Account.getUserDetails(userId)
        .then((response) => dispatch(getUserDetailsSuccess(response)))
        .catch((error) => dispatch(getUserDetailsFailure(error)));
}