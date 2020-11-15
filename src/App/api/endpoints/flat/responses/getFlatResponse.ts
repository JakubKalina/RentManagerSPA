export interface GetFlatResponse {
    id: number;
    description: string
    address: AddressForGetFlatResponse;
}

export interface AddressForGetFlatResponse {
    homeAddress: string;
    city: string;
    postalCode: string;
}