import { GetLandlordFlatsRequest } from './../../../api/endpoints/flat/requests/getLandlordFlatsRequest';
import { StatusType } from 'App/types/requestStatus';
import { FlatForGetLandlordFlatsResponse } from 'App/api/endpoints/flat/responses/getLandlordFlatsResponse';
const { INITIAL } = StatusType;

export interface LandlordFlatsState {
    status: {
        getFlats: StatusType;
        createFlat: StatusType;
        updateFlat: StatusType;
        deleteFlat: StatusType;
    };
    error: string[];
    flats: FlatForGetLandlordFlatsResponse[];
    getFlatsParams: GetLandlordFlatsRequest;
    getFlatsTotalPages: number;
}

export const landlordFlatsInitialState: LandlordFlatsState = {
    status: {
        getFlats: INITIAL,
        createFlat: INITIAL,
        updateFlat: INITIAL,
        deleteFlat: INITIAL
    },
    error: null,
    flats: [],
    getFlatsParams: null,
    getFlatsTotalPages: 0
};