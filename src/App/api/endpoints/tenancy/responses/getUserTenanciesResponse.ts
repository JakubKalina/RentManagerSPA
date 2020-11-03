import { RoomForGetRoomsResponse } from "../../room/responses/getRoomsResponse";

export interface GetUserTenanciesResponse {
    id: number;
    startDate: Date;
    endDate: Date;
    deposit: number;
    room: RoomForGetUserTenanciesResponse;

}

export interface RoomForGetUserTenanciesResponse {
    id: number;
    name: string;
}