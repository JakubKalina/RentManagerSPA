import { RoomForGetRoomsResponse } from "../../room/responses/getRoomsResponse";

export interface GetFlatTenanciesResponse {
    id: number;
    startDate: Date;
    endDate: Date;
    deposit: number;
    room: RoomForGetRoomsResponse;
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