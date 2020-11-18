import { defaultPageQueryParams } from './../../common/utils/pagination.utilities';
import { UserForGetUsersResponse } from "App/api/endpoints/account/responses/getUsersResponse";
import { GetUsersRequest } from "App/api/endpoints/account/requests/getUsersRequest";
import StatusType from "App/types/requestStatus";
import { GetUserDetailsResponse } from 'App/api/endpoints/account/responses/getUserDetailsResponse';

const { INITIAL } = StatusType;

export interface UsersState {
    status: {
        getUsers: StatusType;
        getUserDetails: StatusType;
    };
    error: string[];
    user: GetUserDetailsResponse;
    users: UserForGetUsersResponse[];
    getUsersParams: GetUsersRequest;
    getUsersTotalPages: number;
}

export const usersInitialState: UsersState = {
    status: {
        getUsers: INITIAL,
        getUserDetails: INITIAL
    },
    error: null,
    user: null,
    users: [],
    getUsersParams: defaultPageQueryParams,
    getUsersTotalPages: 0
}