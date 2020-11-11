import { defaultPageQueryParams } from './../../common/utils/pagination.utilities';
import { UserForGetUsersResponse } from "App/api/endpoints/account/responses/getUsersResponse";
import { GetUsersRequest } from "App/api/endpoints/account/requests/getUsersRequest";
import StatusType from "App/types/requestStatus";

const { INITIAL } = StatusType;

export interface UsersState {
    status: {
        getUsers: StatusType;
    };
    error: string[];
    users: UserForGetUsersResponse[];
    getUsersParams: GetUsersRequest;
    getUsersTotalPages: number;
    // userReviews
}

export const usersInitialState: UsersState = {
    status: {
        getUsers: INITIAL
    },
    error: null,
    users: [],
    getUsersParams: defaultPageQueryParams,
    getUsersTotalPages: 0
}