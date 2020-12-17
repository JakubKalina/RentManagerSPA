import { GetLandlordFlatsRequest } from './../../../api/endpoints/flat/requests/getLandlordFlatsRequest';
import { StatusType } from 'App/types/requestStatus';
import { FlatForGetLandlordFlatsResponse } from 'App/api/endpoints/flat/responses/getLandlordFlatsResponse';
import defaultPageQueryParams from 'App/common/utils/defaultPageQueryParams';
import { GetFlatResponse } from 'App/api/endpoints/flat/responses/getFlatResponse';
import { GetAdminFlatsRequest } from 'App/api/endpoints/flat/requests/getAdminFlatsRequest';
import { FlatForGetAdminFlatsResponse } from 'App/api/endpoints/flat/responses/getAdminFlatsResponse';
const { INITIAL } = StatusType;

export interface AdminFlatsState {
    status: {
        getFlats: StatusType;
    };
    error: string[];
    flats: FlatForGetAdminFlatsResponse[];
    getFlatsParams: GetAdminFlatsRequest;
    getFlatsTotalPages: number;
}

export const adminFlatsInitialState: AdminFlatsState = {
    status: {
        getFlats: INITIAL
    },
    error: null,
    flats: [],
    getFlatsParams: defaultPageQueryParams,
    getFlatsTotalPages: 0,
};