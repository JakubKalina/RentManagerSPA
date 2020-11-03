import { ICollectionResponse } from 'App/types/pagination/pagination';
export interface GetRoomsResponse extends ICollectionResponse<RoomForGetRoomsResponse> {}

export interface RoomForGetRoomsResponse {
    id: number;
    name: string;
}