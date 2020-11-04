import { ICollectionResponse } from 'App/types/pagination/pagination';
import { Address } from 'cluster';

export interface GetLandlordFlatsResponse extends ICollectionResponse<FlatForGetLandlordFlatsResponse> {}

export interface FlatForGetLandlordFlatsResponse {
    id: number;
    description: string
    address: AddressForFlatForGetLandlordFlatsResponse;
}

export interface AddressForFlatForGetLandlordFlatsResponse {
    homeAddress: string;
    city: string;
    postalCode: string;
}