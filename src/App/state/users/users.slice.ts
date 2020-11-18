import { GetUsersResponse } from './../../api/endpoints/account/responses/getUsersResponse.d';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import StatusType from 'App/types/requestStatus';
import { usersInitialState, UsersState } from './users.state';
import { GetUserDetailsResponse } from 'App/api/endpoints/account/responses/getUserDetailsResponse';

const { FAILED, SUCCESS, LOADING } = StatusType;


const usersSlice = createSlice({
    name: 'users',
    initialState: usersInitialState,
    reducers: {

        getUserDetailsStart: (state: UsersState) => {
            state.status.getUserDetails = LOADING;
        },
        getUserDetailsSuccess: (state: UsersState, action: PayloadAction<GetUserDetailsResponse>) => {
            state.status.getUserDetails = SUCCESS;
            state.user = action.payload;
        },
        getUserDetailsFailure: (state: UsersState, action: PayloadAction<string[]>) => {
            state.status.getUserDetails = FAILED;
            state.error = action.payload;
        },


        getUsersStart: (state: UsersState) => {
            state.status.getUsers = LOADING;
        },
        getUsersSuccess: (state: UsersState, action: PayloadAction<GetUsersResponse>) => {
            state.status.getUsers = SUCCESS;
            state.users = action.payload.data;
            state.getUsersParams = action.payload;

        },
        getUsersFailure: (state: UsersState, action: PayloadAction<string[]>) => {
            state.status.getUsers = FAILED;
            state.error = action.payload;
        }

    }

});

export default usersSlice;

export const {
    getUsersStart,
    getUsersSuccess,
    getUsersFailure,

    getUserDetailsStart,
    getUserDetailsSuccess,
    getUserDetailsFailure

} = usersSlice.actions;