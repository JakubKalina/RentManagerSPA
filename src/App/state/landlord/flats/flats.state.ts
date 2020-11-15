import { GetLandlordFlatsRequest } from './../../../api/endpoints/flat/requests/getLandlordFlatsRequest';
import { StatusType } from 'App/types/requestStatus';
import { FlatForGetLandlordFlatsResponse } from 'App/api/endpoints/flat/responses/getLandlordFlatsResponse';
import defaultPageQueryParams from 'App/common/utils/defaultPageQueryParams';
import { GetFlatResponse } from 'App/api/endpoints/flat/responses/getFlatResponse';
const { INITIAL } = StatusType;

export interface LandlordFlatsState {
    status: {
        getFlats: StatusType;
        getFlat: StatusType;
        createFlat: StatusType;
        updateFlat: StatusType;
        deleteFlat: StatusType;
    };
    error: string[];
    flats: FlatForGetLandlordFlatsResponse[];
    getFlatsParams: GetLandlordFlatsRequest;
    getFlatsTotalPages: number;
    selectedFlat: GetFlatResponse;
}

export const landlordFlatsInitialState: LandlordFlatsState = {
    status: {
        getFlats: INITIAL,
        getFlat: INITIAL,
        createFlat: INITIAL,
        updateFlat: INITIAL,
        deleteFlat: INITIAL
    },
    error: null,
    flats: [],
    getFlatsParams: defaultPageQueryParams,
    getFlatsTotalPages: 0,
    selectedFlat: null
};