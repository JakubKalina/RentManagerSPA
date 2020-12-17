import { ICollectionResponse } from 'App/types/pagination/pagination';
import { Address } from 'cluster';

export interface GetAdminFlatsResponse extends ICollectionResponse<FlatForGetAdminFlatsResponse> {}

export interface FlatForGetAdminFlatsResponse {
    id: number;
    description: string
    address: AddressForFlatForGetAdminFlatsResponse;
}

export interface AddressForFlatForGetAdminFlatsResponse {
    homeAddress: string;
    city: string;
    postalCode: string;
}