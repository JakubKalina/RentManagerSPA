import { ICollectionResponse } from 'App/types/pagination/pagination';
import { Address } from 'cluster';

export interface GetTenantFlatsResponse extends ICollectionResponse<FlatForGetTenantFlatsResponse> {}

export interface FlatForGetTenantFlatsResponse {
    id: number;
    description: string
    address: AddressForFlatForGetTenantFlatsResponse;
}

export interface AddressForFlatForGetTenantFlatsResponse {
    homeAddress: string;
    city: string;
    postalCode: string;
}