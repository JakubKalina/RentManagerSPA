import StatusType from "App/types/requestStatus";
import { usersInitialState } from "App/state/users/users.state";
import { GetFlatTenanciesResponse } from "App/api/endpoints/tenancy/responses/getFlatTenanciesResponse";

const { INITIAL } = StatusType;

export interface LandlordTenanciesState {
    status: {
        getTenancies: StatusType;
        getTenancy: StatusType;
        beginTenancy: StatusType;
        updateTenancy: StatusType;
    }
    error: string[];
    tenancies: GetFlatTenanciesResponse[];
    tenancy: GetFlatTenanciesResponse;
}

export const landlordTenanciesInitialState: LandlordTenanciesState = {
    status: {
        getTenancies: INITIAL,
        getTenancy: INITIAL,
        beginTenancy: INITIAL,
        updateTenancy: INITIAL
    },
    error: null,
    tenancies: [],
    tenancy: null
};