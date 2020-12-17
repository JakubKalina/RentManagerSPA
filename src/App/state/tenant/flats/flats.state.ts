import { GetLandlordFlatsRequest } from './../../../api/endpoints/flat/requests/getLandlordFlatsRequest';
import { StatusType } from 'App/types/requestStatus';
import { FlatForGetLandlordFlatsResponse } from 'App/api/endpoints/flat/responses/getLandlordFlatsResponse';
import defaultPageQueryParams from 'App/common/utils/defaultPageQueryParams';
import { GetFlatResponse } from 'App/api/endpoints/flat/responses/getFlatResponse';
import { GetTenantFlatsRequest } from 'App/api/endpoints/flat/requests/getTenantFlatsRequest';
import { FlatForGetTenantFlatsResponse } from 'App/api/endpoints/flat/responses/getTenantFlatsResponse';
const { INITIAL } = StatusType;

export interface TenantFlatsState {
    status: {
        getFlats: StatusType;
    };
    error: string[];
    flats: FlatForGetTenantFlatsResponse[];
    getFlatsParams: GetTenantFlatsRequest;
    getFlatsTotalPages: number;
}

export const tenantFlatsInitialState: TenantFlatsState = {
    status: {
        getFlats: INITIAL,
    },
    error: null,
    flats: [],
    getFlatsParams: defaultPageQueryParams,
    getFlatsTotalPages: 0,
};