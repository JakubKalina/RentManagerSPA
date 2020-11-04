export interface GetFlatTenanciesResponse {
    id: number;
    startDate: Date;
    endDate: Date;
    deposit: number;
    room: RoomForGetFlatTenanciesResponse;
    user: UserForGetFlatTenanciesResponse;
}

export interface RoomForGetFlatTenanciesResponse {
    id: number;
    name: string;
}

export interface UserForGetFlatTenanciesResponse {
    id: string;
    searchId: string;
    firstName: string;
    lastName: string;
}