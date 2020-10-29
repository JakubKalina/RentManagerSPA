import { ICollectionResponse } from 'App/types/pagination/pagination';
import { Address } from 'cluster';

export interface GetFlatsResponse extends ICollectionResponse<FlatForGetFlatsResponse> {}

export interface FlatForGetFlatsResponse {
    id: number;
    description: string
    address: AddressForFlatForGetFlatsResponse;
}

export interface AddressForFlatForGetFlatsResponse {
    homeAddress: string;
    city: string;
    postalCode: string;
}